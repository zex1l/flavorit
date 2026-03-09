import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsEmail, IsOptional, ValidateNested } from 'class-validator';
import { Role } from 'prisma/generated/prisma/enums';
import { UpdateUserMeasurmentInput } from './measurment.input';
import { UpdateUserProfileInput } from './profile.input';

registerEnumType(Role, {
  name: 'Role',
});

@InputType({ description: 'Update user input' })
export class UpdateUserInput {
  @Field(() => String, { nullable: true, description: 'New user email' })
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email' })
  email?: string;

  @Field(() => UpdateUserProfileInput, {
    nullable: true,
    description: 'Update user profile',
  })
  @ValidateNested()
  @Type(() => UpdateUserProfileInput)
  profile?: UpdateUserProfileInput;

  @Field(() => UpdateUserMeasurmentInput, {
    nullable: true,
    description: 'Update user body',
  })
  @ValidateNested()
  @Type(() => UpdateUserMeasurmentInput)
  measurment?: UpdateUserMeasurmentInput;
}
