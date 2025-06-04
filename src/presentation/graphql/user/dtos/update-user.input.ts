import { Field, ArgsType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';

// import from common
import { returnString } from '@/common/utils';

// import from presentation
import { CreateUserInput } from './create-user.input';

@ArgsType()
export class UpdateUserInput extends OmitType(CreateUserInput, [
  'password',
  'email',
]) {
  @Field(returnString, { nullable: false })
  @IsUUID()
  userId!: string;
}
