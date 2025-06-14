import { Field, ArgsType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

// import from common
import { returnString } from '@/common/utils';

import { CreateProductInput } from './create-product.input';
@ArgsType()
export class UpdateProductInput extends CreateProductInput {
  @Field(returnString, { nullable: false })
  @IsUUID()
  productId!: string;
}
