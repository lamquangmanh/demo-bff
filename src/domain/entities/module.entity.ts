import { Field, ObjectType } from '@nestjs/graphql';

// import from common
import { returnString } from '@/common/utils';

// import from base
import { BaseEntity } from '@/domain/entities/base.entity';
import { ProductEntity } from './product.entity';

@ObjectType({ description: 'Module entity' })
export class ModuleEntity extends BaseEntity {
  @Field(returnString, { nullable: false, description: 'Module ID' })
  moduleId!: string;

  @Field(returnString, { nullable: false, description: 'Name' })
  name!: string;

  @Field(returnString, { nullable: true })
  url?: string;

  @Field(returnString, { nullable: true })
  icon?: string;

  @Field(returnString, {
    nullable: true,
    description: 'Optional description of the action',
  })
  description?: string;

  @Field(returnString, { nullable: true })
  productId!: string;

  @Field(() => ProductEntity, { nullable: true })
  product?: ProductEntity;
}
