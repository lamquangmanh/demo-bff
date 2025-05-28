import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

// import from common
import { returnString } from '@/common/utils';

@InputType()
export class PermissionInput {
  @Field(returnString, { nullable: false })
  @IsUUID()
  actionId!: string;

  @Field(returnString, { nullable: false })
  @IsUUID()
  resourceId!: string;
}
