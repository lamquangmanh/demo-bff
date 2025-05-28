import { Field, ObjectType } from '@nestjs/graphql';

// import from common
import { returnString } from '@/common/utils';

// import from base
import { BaseEntity } from '@/domain/entites/base.entity';

@ObjectType({ description: 'User Role entity' })
export class UserRoleEntity extends BaseEntity {
  @Field(returnString, { nullable: false, description: 'userRoleId' })
  userRoleId!: string;

  @Field(returnString, { nullable: false, description: 'userId' })
  userId!: string;

  @Field(returnString, { nullable: false, description: 'roleId' })
  roleId!: string;
}
