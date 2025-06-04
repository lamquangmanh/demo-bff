import { Field, ArgsType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

// import from common
import { returnString } from '@/common/utils';

// import from presentation
import { CreateResourceInput } from './create-resource.input';

@ArgsType()
export class UpdateResourceInput extends CreateResourceInput {
  @Field(returnString, { nullable: false })
  @IsUUID()
  resourceId!: string;
}
