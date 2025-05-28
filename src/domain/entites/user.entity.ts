import { Field, ObjectType } from '@nestjs/graphql';

// import from common
import { returnString } from '@/common/utils';
import { UserStatus } from '@/common/constants';

// import from base
import { BaseEntity } from '@/domain/entites/base.entity';

@ObjectType({ description: 'User entity' })
export class UserEntity extends BaseEntity {
  @Field(returnString, { nullable: false, description: 'userId' })
  userId!: string;

  @Field(returnString, { nullable: false, description: 'username' })
  username!: string;

  @Field(returnString, { nullable: false, description: 'email' })
  email!: string;

  @Field(returnString, { nullable: true, description: 'password' })
  password?: string;

  @Field(returnString, { nullable: true, description: 'phone' })
  phone?: string;

  @Field(returnString, { nullable: true, description: 'avatar' })
  avatar?: string;

  @Field(() => UserStatus, { nullable: false, description: 'status' })
  status!: UserStatus;
}
