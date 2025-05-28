import { Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional, IsUUID } from 'class-validator';

// import from common
import { returnString } from '@/common/utils';

@ArgsType()
export class UpdateModuleInput {
  @Field(returnString, { nullable: false })
  @IsUUID()
  moduleId!: string;

  @Field(returnString, { nullable: false })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Field(returnString, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;
}
