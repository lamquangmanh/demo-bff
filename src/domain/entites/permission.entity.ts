import { Field, ObjectType } from '@nestjs/graphql';

// import from common
import { returnString } from '@/common/utils';

// import from base
import { BaseEntity } from '@/domain/entites/base.entity';
import { ResourceEntity } from './resource.entity';
import { ActionEntity } from './action.entity';

@ObjectType({ description: 'Permission entity' })
export class PermissionEntity extends BaseEntity {
  @Field(returnString, { nullable: false, description: 'permissionId' })
  permissionId!: string;

  @Field(returnString, { nullable: false, description: 'roleId' })
  roleId!: string;

  @Field(returnString, { nullable: false, description: 'resourceId' })
  resourceId!: string;

  @Field(() => ResourceEntity, { nullable: true, description: 'resource' })
  resource?: ResourceEntity;

  @Field(returnString, { nullable: false, description: 'actionId' })
  actionId!: string;

  @Field(() => ActionEntity, { nullable: true, description: 'action' })
  action?: ActionEntity;
}
