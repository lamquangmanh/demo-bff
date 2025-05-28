import { Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID, IsOptional } from 'class-validator';

// import from common
import { returnString } from '@/common/utils';

// import from presentation
import { PermissionInput } from './permission.input';

@ArgsType()
export class CreateRoleInput {
  @Field(returnString, { nullable: false })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Field(returnString, { nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @Field(returnString, { nullable: false })
  @IsUUID()
  moduleId!: string;

  @Field(() => [PermissionInput], { nullable: false })
  permissions!: PermissionInput[];
}
