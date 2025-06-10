import { Field, ObjectType } from '@nestjs/graphql';

// import from common
import { returnString } from '@/common/utils';

@ObjectType()
export class LoginResponse {
  @Field(returnString, { nullable: false })
  accessToken!: string;

  @Field(returnString, { nullable: false })
  refreshToken!: string;
}
