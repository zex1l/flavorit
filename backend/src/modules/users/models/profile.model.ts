import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Gender } from 'prisma/generated/prisma/enums';

registerEnumType(Gender, { name: 'Gender' });

@ObjectType()
export class ProfileModel {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  fullName!: string;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field(() => Gender, { nullable: true })
  gender?: `${Gender}` | null;

  @Field({ nullable: true })
  bio?: string;

  @Field(() => String, { nullable: false })
  userId!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
