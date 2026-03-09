import { Field, ID, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { ActivityLevel, NutritionGoal } from "prisma/generated/prisma/enums";

registerEnumType(ActivityLevel, { name: 'ActivityLevel' });
registerEnumType(NutritionGoal, { name: 'NutritionGoal' });

@ObjectType()
export class BodyMeasurementModel {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => Int, { nullable: true })
  heightCm?: number;

  @Field(() => Int, { nullable: true })
  weightKg?: number;

  @Field(() => Int, { nullable: true })
  goalWeightKg?: number;

  @Field(() => Int, { nullable: true })
  chestCm?: number;

  @Field(() => Int, { nullable: true })
  waistCm?: number;

  @Field(() => Int, { nullable: true })
  thighCm?: number;

  @Field(() => Int, { nullable: true })
  armCm?: number;

  @Field(() => ActivityLevel, { nullable: true })
  activityLevel?: ActivityLevel;

  @Field(() => NutritionGoal, { nullable: true })
  nutritionGoal?: NutritionGoal;

  @Field()
  userId!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

}