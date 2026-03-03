import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { AuthInput } from './auth.input';
import { hash, verify } from 'argon2';
import { IAuthTokenData } from './auth.interface';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UsersService } from 'src/modules/users/users.service';
import { Response } from 'express';
import {
  ACCESS_EXPIRES_TOKEN_HOUR,
  ACCESS_TOKEN_COOKIE_NAME,
  EMAIL_OR_PASSWORD_INVALID_ERROR,
  LOGIN_ERROR,
  REFRESH_EXPIRES_TOKEN_DAYS,
  REFRESH_TOKEN_COOKIE_NAME,
  REGISTRATION_ERROR,
  USER_ALREADY_EXISTS_ERROR,
} from './auth.constants';
import { isDev } from 'src/shared/utils/is-dev';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  //* ------------------------------ Register --------------------------- */
  async register(input: AuthInput) {
    try {
      const email = input.email.toLowerCase();

      const userExists = this.usersService.getByEmail({ email });

      if (userExists) throw new BadRequestException(USER_ALREADY_EXISTS_ERROR);

      const user = await this.prismaService.user.create({
        data: {
          email,
          password: await hash(input.password),
        },
      });

      const tokens = this.generateTokens({ userId: user.id, role: user.role });

      return { user, ...tokens };
    } catch (error) {
      throw new BadRequestException(REGISTRATION_ERROR + error);
    }
  }

  //* ------------------------------ Login --------------------------- */
  async login(input: AuthInput) {
    try {
      const user = await this.validateUser(input);

      const tokens = this.generateTokens({ userId: user.id, role: user.role });

      return { user, ...tokens };
    } catch (error) {
      throw new BadRequestException(LOGIN_ERROR + error);
    }
  }

  //* ------------------------------ Validate User --------------------------- */
  private async validateUser(input: AuthInput) {
    const email = input.email;

    const user = await this.usersService.getByEmail({ email });

    if (!user) throw new NotFoundException(EMAIL_OR_PASSWORD_INVALID_ERROR);

    const isPassWordValid = await verify(user.password, input.password);

    if (!isPassWordValid)
      throw new NotFoundException(EMAIL_OR_PASSWORD_INVALID_ERROR);

    return user;
  }

  //* ------------------------------ Generate Tokens --------------------------- */
  private generateTokens(data: IAuthTokenData) {
    const accessToken = this.jwtService.sign(data, {
      expiresIn: `${ACCESS_EXPIRES_TOKEN_HOUR}h`,
    });

    const refreshToken = this.jwtService.sign(
      { userId: data.userId },
      {
        expiresIn: `${REFRESH_EXPIRES_TOKEN_DAYS}d`,
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  setAuthCookie(
    response: Response,
    refreshToken: string | null,
    accessToken: string,
  ) {
    const defaultCookieOptions = {
      httpOnly: true,
      secure: true,
      domain: this.configService.get<string>('DOMAIN_NAME'),
      sameSite: isDev(this.configService) ? 'none' : 'strict',
    } as const;

    response.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
      ...defaultCookieOptions,
      expires: accessToken
        ? new Date(0)
        : new Date(Date.now() + ACCESS_EXPIRES_TOKEN_HOUR * 60 * 60 * 1000),
    });

    response.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      ...defaultCookieOptions,
      expires: refreshToken
        ? new Date(0)
        : new Date(
            Date.now() + REFRESH_EXPIRES_TOKEN_DAYS * 24 * 60 * 60 * 1000,
          ),
    });
  }
}
