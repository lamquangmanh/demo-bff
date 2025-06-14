import { Field, ArgsType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

// import from common
import { returnString } from '@/common/utils';

@ArgsType()
export class DeleteProductInput {
  @Field(returnString, { nullable: false })
  @IsUUID()
  productId!: string;
}
