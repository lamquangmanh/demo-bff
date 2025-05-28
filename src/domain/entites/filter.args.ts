import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

// import from common
import { returnString } from '@/common/utils';

@InputType()
export class FilterArgs {
  @Field(returnString, { nullable: false })
  @IsString()
  field!: string;

  @Field(returnString, { nullable: false })
  @IsString()
  value!: string;
}
