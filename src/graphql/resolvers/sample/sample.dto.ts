import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class SampleDto {
  @Field()
  @IsString()
  name: string;
}

@InputType()
export class AddSampleDto {
  @Field()
  @IsString()
  name: string;
}
