import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';
import { ActivityLevel, NutritionGoal } from 'prisma/generated/prisma/enums';

registerEnumType(ActivityLevel, { name: 'ActivityLevel' });
registerEnumType(NutritionGoal, { name: 'NutritionGoal' });

@InputType({ description: 'Update measurment input' })
export class UpdateUserMeasurmentInput {
  @Field(() => Int, { nullable: true, description: 'New user heightCm' })
  @IsNumber()
  @IsOptional()
  heightCm?: number;

  @Field(() => Int, { nullable: true, description: 'New user weightKg' })
  @IsNumber()
  @IsOptional()
  weightKg?: number;

  @Field(() => Int, { nullable: true, description: 'New user goalWeightKg' })
  @IsNumber()
  @IsOptional()
  goalWeightKg?: number;

  @Field(() => Int, { nullable: true, description: 'New user chestCm' })
  @IsNumber()
  @IsOptional()
  chestCm?: number;

  @Field(() => Int, { nullable: true, description: 'New user waistCm' })
  @IsNumber()
  @IsOptional()
  waistCm?: number;

  @Field(() => Int, { nullable: true, description: 'New user thighCm' })
  @IsNumber()
  @IsOptional()
  thighCm?: number;

  @Field(() => Int, { nullable: true, description: 'New user armCm' })
  @IsNumber()
  @IsOptional()
  armCm?: number;

  @Field(() => ActivityLevel, {
    nullable: true,
    description: 'New user activity level',
  })
  @IsNumber()
  @IsOptional()
  activityLevel?: ActivityLevel;

  @Field(() => NutritionGoal, {
    nullable: true,
    description: 'New user nutrition goal',
  })
  nutritionGoal?: NutritionGoal;
}
