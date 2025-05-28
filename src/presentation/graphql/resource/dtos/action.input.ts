import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsOptional,
  IsEnum,
} from 'class-validator';

// import from common
import { returnString } from '@/common/utils';
import { RequestType } from '@/common/constants';

@InputType()
export class ActionInput {
  @Field(returnString, { nullable: true })
  @IsOptional()
  @IsUUID()
  actionId?: string;

  @Field(returnString, { nullable: false })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Field(returnString, { nullable: false })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @Field(returnString, { nullable: false })
  @IsEnum(RequestType)
  requestType!: RequestType;

  @Field(returnString, { nullable: false })
  @IsString()
  @IsNotEmpty()
  method!: string;

  @Field(returnString, { nullable: false })
  @IsString()
  @IsNotEmpty()
  url!: string;
}
