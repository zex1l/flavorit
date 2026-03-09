import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  ActivityLevel,
  Gender,
  NutritionGoal,
  Role,
} from 'prisma/generated/prisma/enums';
import { BodyMeasurementModel } from './measurment.model';
import { ProfileModel } from './profile.model';

registerEnumType(Role, { name: 'Role' });

@ObjectType()
export class UserModel {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: true })
  email!: string;

  @Field(() => String, { nullable: true })
  password!: string;

  @Field(() => Role)
  role!: Role;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Field(() => BodyMeasurementModel, { nullable: true })
  bodyMeasurement?: BodyMeasurementModel;

  @Field(() => ProfileModel, { nullable: true })
  profile?: ProfileModel;
}
