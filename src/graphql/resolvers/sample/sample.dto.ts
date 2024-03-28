import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class LoginDto {
  @Field()
  @IsString()
  password: string;
}

@InputType()
export class ResetPasswordDto {
  @Field()
  @IsString()
  username: string;
}
