import { Field, ObjectType } from '@nestjs/graphql';

// import from common
import { returnString } from '@/common/utils';

@ObjectType()
class PermissionInfo {
  @Field(returnString, { nullable: false })
  name!: string;

  @Field(returnString, { nullable: false })
  url!: string;

  @Field(returnString, { nullable: false })
  method!: string;

  @Field(returnString, { nullable: false })
  requestType!: string;
}

@ObjectType({ description: 'Get list' })
export class GetPermissionsByUserResponse {
  @Field(() => [PermissionInfo])
  permissions!: PermissionInfo[];
}
