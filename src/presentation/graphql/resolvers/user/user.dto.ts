import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class AddUserDto {
  @Field()
  @IsString()
  user_name: string;

  @Field()
  @IsString()
  permissions: string;
}

@InputType()
export class UpdateUserDto {
  @Field()
  @IsString()
  user_id: string;

  @Field()
  @IsString()
  user_name: string;

  @Field()
  @IsString()
  permissions: string;
}

@InputType()
export class UsersFilterDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  size?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  limit?: number;
}
