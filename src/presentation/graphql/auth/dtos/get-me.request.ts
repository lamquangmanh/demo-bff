import { Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

// import from common
import { returnString } from '@/common/utils';

@ArgsType()
export class GetMeRequest {
  @Field(returnString, { nullable: false })
  @IsString()
  @IsNotEmpty()
  userId!: string;
}
