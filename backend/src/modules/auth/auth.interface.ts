import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Role } from 'prisma/generated/prisma/enums';
import { UserModel } from '../users/models/user.model';

export interface IAuthTokenData {
  userId: string;
  role: Role;
}

export type TRequestWithUser = {
  user: TCurrentUser;
};


export type TCurrentUser = Omit<UserModel, 'password'> | null | undefined;

registerEnumType(Role, { name: 'Role' });


@ObjectType()
export class AuthResponse {
  @Field(() => UserModel)
  user: UserModel;

  @Field()
  accessToken: string;
}
