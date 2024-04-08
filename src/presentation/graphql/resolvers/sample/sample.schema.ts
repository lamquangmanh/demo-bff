import { Field, ObjectType } from '@nestjs/graphql';
// import { IsOptional } from 'class-validator';
// import { JsonScalar } from '../../common/scalar/json.scalar';

@ObjectType('Sample')
export class SampleSchema {
  @Field()
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @Field((type) => JsonScalar)
  // @IsOptional()
  // data: any;
}
