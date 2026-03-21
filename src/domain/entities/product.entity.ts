import { Field, ObjectType } from '@nestjs/graphql';

// import from common
import { returnString } from '@/common/utils';

// import from base
import { BaseEntity } from '@/domain/entities/base.entity';

@ObjectType({ description: 'Product entity' })
export class ProductEntity extends BaseEntity {
  @Field(returnString, { nullable: false })
  productId!: string;

  @Field(returnString, { nullable: false })
  name!: string;

  @Field(returnString, { nullable: false })
  url!: string;

  @Field(returnString, { nullable: true })
  icon?: string;

  @Field(returnString, { nullable: true })
  description?: string;
}
