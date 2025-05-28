import { Field, ObjectType } from '@nestjs/graphql';

// import from common
import { returnString } from '@/common/utils';

@ObjectType({ description: 'Base entity' })
export class BaseEntity {
  @Field(returnString, { nullable: true, description: 'Created At' })
  createdAt?: string;

  @Field(returnString, { nullable: true, description: 'Created user id' })
  createdUserId?: string;

  @Field(returnString, { nullable: true, description: 'Updated At' })
  updatedAt?: string;

  @Field(returnString, { nullable: true, description: 'Updated user id' })
  updatedUserId?: string;

  @Field(returnString, { nullable: true, description: 'Deleted At' })
  deletedAt?: string;

  @Field(returnString, { nullable: true, description: 'Deleted user id' })
  deletedUserId?: string;
}
