import { Field, ObjectType } from '@nestjs/graphql';

// import from common
import { returnString } from '@/common/utils';

// import from base
import { BaseEntity } from '@/domain/entites/base.entity';

@ObjectType({ description: 'Module entity' })
export class ModuleEntity extends BaseEntity {
  @Field(returnString, { nullable: false, description: 'Module ID' })
  moduleId!: string;

  @Field(returnString, { nullable: false, description: 'Name' })
  name!: string;

  @Field(returnString, {
    nullable: true,
    description: 'Optional description of the action',
  })
  description?: string;
}
