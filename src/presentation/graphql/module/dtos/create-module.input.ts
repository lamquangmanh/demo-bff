import { Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional, IsUUID } from 'class-validator';

// import from common
import { returnString } from '@/common/utils';

@ArgsType()
export class CreateModuleInput {
  @Field(returnString, { nullable: false })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Field(returnString, { nullable: false })
  @IsUUID()
  productId!: string;

  @Field(returnString, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(returnString, { nullable: true })
  @IsOptional()
  @IsString()
  icon?: string;

  @Field(returnString, { nullable: true })
  @IsOptional()
  @IsString()
  url?: string;
}
