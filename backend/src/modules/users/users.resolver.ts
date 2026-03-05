import { Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserModel } from './models/user.model';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserModel)
  async getProfile(@CurrentUser('id') id: string) {
    return await this.usersService.getById({ id });
  }
}
