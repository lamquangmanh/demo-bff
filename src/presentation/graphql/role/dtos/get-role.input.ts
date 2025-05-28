import { Field, ArgsType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

// import from common
import { returnString } from '@/common/utils';

@ArgsType()
export class GetRoleInput {
  @Field(returnString, { nullable: false })
  @IsUUID()
  roleId!: string;
}
