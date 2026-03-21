import { Field, ObjectType } from '@nestjs/graphql';

// import from common
import { returnString } from '@/common/utils';

@ObjectType({ description: 'Create user entity' })
export class CreatedUserEntity {
  @Field(returnString, { nullable: true, description: 'userId' })
  userId?: string;

  @Field(returnString, { nullable: true, description: 'username' })
  username?: string;

  @Field(returnString, { nullable: true, description: 'email' })
  email?: string;

  @Field(returnString, { nullable: true, description: 'avatar' })
  avatar?: string;
}

@ObjectType({ description: 'Updated user entity' })
export class UpdatedUserEntity extends CreatedUserEntity {}

@ObjectType({ description: 'Deleted user entity' })
export class DeletedUserEntity extends CreatedUserEntity {}

@ObjectType({ description: 'Base entity' })
export class BaseEntity {
  @Field(returnString, { nullable: true, description: 'Created At' })
  createdAt?: string;

  @Field(returnString, { nullable: true, description: 'Created user id' })
  createdUserId?: string;

  @Field(() => CreatedUserEntity, {
    nullable: true,
    description: 'Created user',
  })
  createdUser?: CreatedUserEntity | null;

  @Field(returnString, { nullable: true, description: 'Updated At' })
  updatedAt?: string;

  @Field(returnString, { nullable: true, description: 'Updated user id' })
  updatedUserId?: string;

  @Field(() => UpdatedUserEntity, {
    nullable: true,
    description: 'Updated user',
  })
  updatedUser?: UpdatedUserEntity | null;

  @Field(returnString, { nullable: true, description: 'Deleted At' })
  deletedAt?: string;

  @Field(returnString, { nullable: true, description: 'Deleted user id' })
  deletedUserId?: string;

  @Field(() => DeletedUserEntity, {
    nullable: true,
    description: 'Deleted user',
  })
  deletedUser?: DeletedUserEntity | null;
}
