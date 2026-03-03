import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { AuthInput } from './auth.input';
import { hash } from 'argon2';
import { IAuthTokenData } from './auth.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private readonly ACCESS_EXPIRES_TOKEN_HOUR = 1;
  private readonly REFRESH_EXPIRES_TOKEN_DAYS = 3;

  async register(input: AuthInput) {
    try {
      const email = input.email.toLowerCase();

      // TODO implements to userService
      const isUserExist = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });

      if (isUserExist) throw new BadRequestException('User already exist');

      // TODO implements to userService
      const user = await this.prismaService.user.create({
        data: {
          email,
          password: await hash(input.password),
        },
      });

      const tokens = this.generateTokens({ userId: user.id, role: user.role });

      return { user, ...tokens };
    } catch (error) {
      throw new BadRequestException('Register faild: ' + error);
    }
  }

  private generateTokens(data: IAuthTokenData) {
    const accessToken = this.jwtService.sign(data, {
      expiresIn: `${this.ACCESS_EXPIRES_TOKEN_HOUR}h`,
    });

    const refreshToken = this.jwtService.sign(
      { userId: data.userId },
      {
        expiresIn: `${this.REFRESH_EXPIRES_TOKEN_DAYS}d`,
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
