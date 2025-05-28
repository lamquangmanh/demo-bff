import { Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

// import from common
import { returnString } from '@/common/utils';

// import from presentation
import { ActionInput } from './action.input';

@ArgsType()
export class CreateResourceInput {
  @Field(returnString, { nullable: false })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Field(returnString, { nullable: false })
  @IsUUID()
  moduleId!: string;

  @Field(() => [ActionInput], { nullable: false })
  actions!: ActionInput[];
}
