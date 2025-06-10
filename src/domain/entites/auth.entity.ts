import { Field, ObjectType } from '@nestjs/graphql';

// import from common
import { returnString } from '@/common/utils';

@ObjectType({ description: 'Auth entity' })
export class AuthEntity {
  @Field(returnString, { nullable: false })
  accessToken!: string;

  @Field(returnString, { nullable: false })
  refreshToken!: string;
}
