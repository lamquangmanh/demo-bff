import { Field, ObjectType } from '@nestjs/graphql';

// import from common
import { returnString } from '@/common/utils';

// import from base
import { BaseEntity } from '@/domain/entites/base.entity';

// import from domain
import { ActionEntity } from '@/domain/entites/action.entity';

@ObjectType({ description: 'Resource entity' })
export class ResourceEntity extends BaseEntity {
  @Field(returnString, { nullable: false, description: 'resourceId' })
  resourceId!: string;

  @Field(returnString, { nullable: false, description: 'name' })
  name!: string;

  @Field(returnString, { nullable: false, description: 'moduleId' })
  moduleId!: string;

  @Field(() => [ActionEntity], { nullable: true, description: 'actions' })
  actions?: ActionEntity[];
}
