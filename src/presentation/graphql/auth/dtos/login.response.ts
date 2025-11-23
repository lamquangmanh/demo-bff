import { Field, ObjectType } from '@nestjs/graphql';

// import from common
import { returnString, returnBoolean } from '@/common/utils';

@ObjectType()
export class LoginResponse {
  @Field(returnString, { nullable: false })
  accessToken!: string;

  @Field(returnString, { nullable: false })
  refreshToken!: string;

  @Field(returnBoolean, { nullable: false })
  success?: boolean;
}
