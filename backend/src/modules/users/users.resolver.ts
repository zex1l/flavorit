import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserModel } from './models/user.model';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';
import { UpdateUserInput } from './inputs/user.input';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserModel)
  @Auth()
  async getProfile(@CurrentUser('id') id: string) {
    return await this.usersService.getById({ id });
  }

  @Mutation(() => UserModel)
  @Auth()
  async updateProfile(
    @CurrentUser('id') id: string,
    @Args('data') data: UpdateUserInput,
  ) {
    return await this.usersService.updateProfile({ id, data });
  }
}
