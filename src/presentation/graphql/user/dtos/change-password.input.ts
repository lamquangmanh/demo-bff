import { Field, ArgsType } from '@nestjs/graphql';
import { IsUUID, IsString } from 'class-validator';

// import from common
import { returnString } from '@/common/utils';

@ArgsType()
export class ChangeUserPasswordInput {
  @Field(returnString, { nullable: false })
  @IsUUID()
  userId!: string;

  @Field(returnString, { nullable: false })
  @IsString()
  password!: string;
}
