import { Field, ObjectType } from '@nestjs/graphql';

// import from common
import { returnString } from '@/common/utils';

@ObjectType()
export class GetMeResponse {
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
