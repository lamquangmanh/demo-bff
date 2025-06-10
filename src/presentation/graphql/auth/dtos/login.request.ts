import { Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

// import from common
import { returnString } from '@/common/utils';

@ArgsType()
export class LoginRequest {
  @Field(returnString, { nullable: false })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @Field(returnString, { nullable: false })
  @IsNotEmpty()
  @IsString()
  password!: string;
}
