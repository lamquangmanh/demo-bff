import { Field, ObjectType } from '@nestjs/graphql';

// import from common
import { returnString } from '@/common/utils';

// import from base
import { BaseEntity } from '@/domain/entites/base.entity';
import { ModuleEntity } from './module.entity';
import { PermissionEntity } from './permission.entity';

@ObjectType({ description: 'Role entity' })
export class RoleEntity extends BaseEntity {
  @Field(returnString, { nullable: false, description: 'roleId' })
  roleId!: string;

  @Field(returnString, { nullable: false, description: 'name' })
  name!: string;

  @Field(returnString, { nullable: true, description: 'description' })
  description?: string;

  @Field(returnString, { nullable: false, description: 'moduleId' })
  moduleId!: string;

  @Field(() => ModuleEntity, { nullable: true })
  module?: ModuleEntity;

  @Field(() => [PermissionEntity], {
    nullable: true,
    description: 'permissions',
  })
  permissions?: PermissionEntity[];
}
