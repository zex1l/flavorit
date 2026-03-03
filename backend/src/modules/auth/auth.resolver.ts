import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from './auth.input';
import { AuthResponse } from './auth.interface';
import { IGqlContext } from 'src/shared/types/type';

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

    return response;
  }

  @Mutation(() => AuthResponse)
  async login(@Args('data') input: AuthInput, @Context() { res }: IGqlContext) {
    const { accessToken, refreshToken, ...response } =
      await this.authService.login(input);

    this.authService.setAuthCookie(res, refreshToken, accessToken);

    return response;
  }
}
