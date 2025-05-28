import { Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

// import from common
import { returnString } from '@/common/utils';

@ArgsType()
export class CreateModuleInput {
  @Field(returnString, { nullable: false })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Field(returnString, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;
}
