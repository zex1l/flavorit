import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from './auth.input';
import { AuthResponse } from './auth.interface';
import { IGqlContext } from 'src/shared/types/type';
import {
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_ERROR,
} from './auth.constants';
import { BadRequestException } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async register(
    @Args('data') input: AuthInput,
    @Context() { res }: IGqlContext,
  ) {
    const { accessToken, refreshToken, ...response } =
      await this.authService.register(input);

    this.authService.setAuthCookie(res, refreshToken, accessToken);

    return { ...response, accessToken };
  }

  @Mutation(() => AuthResponse)
  async login(@Args('data') input: AuthInput, @Context() { res }: IGqlContext) {
    const { accessToken, refreshToken, ...response } =
      await this.authService.login(input);

    this.authService.setAuthCookie(res, refreshToken, accessToken);

    return { ...response, accessToken };
  }

  @Query(() => AuthResponse)
  async newTokens(@Context() { req, res }: IGqlContext) {
    const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE_NAME];

    if (!refreshToken) {
      this.authService.setAuthCookie(res, null, null);
      throw new BadRequestException(REFRESH_TOKEN_ERROR);
    }

    const result = await this.authService.getNewTokens(refreshToken);

    this.authService.setAuthCookie(
      res,
      result.refreshToken,
      result.accessToken,
    );

    return result;
  }

  @Mutation(() => Boolean)
  logout(@Context() { req, res }: IGqlContext) {
    const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE_NAME];

    if (!refreshToken) {
      this.authService.setAuthCookie(res, null, null);
      throw new BadRequestException(REFRESH_TOKEN_ERROR);
    }

    this.authService.setAuthCookie(res, null, null);

    return true;
  }
}
