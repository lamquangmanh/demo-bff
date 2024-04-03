import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class AddUserDto {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  username: string;
}

@InputType()
export class UpdateUserDto {
  @Field()
  @IsNumber()
  id: number;

  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  username: string;
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
