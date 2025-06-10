import { Field, ObjectType } from '@nestjs/graphql';

// import from common
import { returnString } from '@/common/utils';

@ObjectType({ description: 'User Information entity' })
export class UserInformationEntity {
  @Field(returnString, { nullable: false })
  userId!: string;

  @Field(returnString, { nullable: false })
  username!: string;

  @Field(returnString, { nullable: false })
  email!: string;

  @Field(returnString, { nullable: false })
  status!: string;

  @Field(returnString, { nullable: true })
  avatar?: string;

  @Field(returnString, { nullable: true })
  phone?: string;
}
