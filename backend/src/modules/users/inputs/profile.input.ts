import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import {
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { Gender } from 'prisma/generated/prisma/enums';

registerEnumType(Gender, { name: 'Gender' });

@InputType({ description: 'Update profile input' })
export class UpdateUserProfileInput {
  @Field({ nullable: true, description: 'New user full name' })
  @IsOptional()
  @IsString({ message: 'Full name must be a string' })
  @Length(6, 100, { message: 'Full name must be between 6 and 100 characters' })
  fullName?: string;

  @Field(() => Int, { nullable: true, description: 'New user age' })
  @IsOptional()
  @Min(1, { message: 'Age must be at least 1' })
  @Max(150, { message: 'Age must be at most 150' })
  age?: number;

  @Field(() => Gender, { nullable: true, description: 'New user gender' })
  @IsOptional()
  gender?: Gender;

  @Field({ nullable: true, description: 'New user bio' })
  @IsOptional()
  @IsString({ message: 'Bio must be a string' })
  @Length(0, 1000, { message: "Bio can't be longer than 1000 characters" })
  bio?: string;
}
