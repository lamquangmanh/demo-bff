import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Sample')
export class SampleSchema {
  @Field()
  name: string;
  static normalize(sample: SampleSchema) {
    return {
      name: sample.name,
    };
  }
}
