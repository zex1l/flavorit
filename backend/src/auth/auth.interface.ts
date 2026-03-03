import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Role } from 'prisma/generated/prisma/enums';

export interface IAuthTokenData {
  userId: string;
  role: Role;
}

registerEnumType(Role, { name: 'Role' });

@ObjectType()
export class UserModel {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field(() => Role)
  role: Role;
}

@ObjectType()
export class AuthResponse {
  @Field(() => UserModel)
  user: UserModel;

  @Field()
  accessToken: string;
}
