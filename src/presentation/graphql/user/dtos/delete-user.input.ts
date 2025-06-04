import { Field, ArgsType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

// import from common
import { returnString } from '@/common/utils';

@ArgsType()
export class DeleteUserInput {
  @Field(returnString, { nullable: false })
  @IsUUID()
  userId!: string;
}
