import { Field, ObjectType } from '@nestjs/graphql';
// import { ActionRequestType } from '@lamquangmanh/protobuf/dist/action/v1/action';

// import from common
import { returnString } from '@/common/utils';
import { RequestType } from '@/common/constants';

// import from base
import { BaseEntity } from '@/domain/entities/base.entity';

@ObjectType({ description: 'Action entity' })
export class ActionEntity extends BaseEntity {
  @Field(returnString, { nullable: false, description: 'Action ID' })
  actionId!: string;

  @Field(returnString, { nullable: false, description: 'Resource ID' })
  resourceId!: string;

  @Field(returnString, { nullable: false, description: 'Name of the action' })
  name!: string;

  @Field(returnString, {
    nullable: true,
    description: 'Optional description of the action',
  })
  description?: string;

  @Field(() => RequestType, {
    nullable: false,
    description: 'request type of the action',
  })
  requestType!: RequestType;

  @Field(returnString, { nullable: false })
  url!: string;

  @Field(returnString, { nullable: false })
  method!: string;
}
