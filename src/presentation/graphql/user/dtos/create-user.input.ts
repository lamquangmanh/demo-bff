import { Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

// import from common
import { returnString, returnStrings } from '@/common/utils';

@ArgsType()
export class CreateUserInput {
  @Field(returnString, { nullable: false })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @Field(returnString, { nullable: false })
  @IsString()
  @IsNotEmpty()
  email!: string;

  @Field(returnString, { nullable: false })
  @IsString()
  @IsNotEmpty()
  password!: string;

  @Field(returnString, { nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phone?: string;

  @Field(returnString, { nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  avatar?: string;

  @Field(returnString, { nullable: false })
  @IsString()
  @IsNotEmpty()
  status!: string;

  @Field(returnStrings, { nullable: false })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  roleIds!: string[];
}
