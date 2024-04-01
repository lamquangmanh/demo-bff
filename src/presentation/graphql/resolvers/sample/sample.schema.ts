import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Sample')
export class SampleSchema {
  @Field()
  name: string;
}
