import { Scalar } from '@nestjs/graphql';
import { DateTimeResolver } from 'graphql-scalars';

@Scalar('DateTime', () => Date)
export class DateTimeScalar {
  description = DateTimeResolver.description;
  serialize = DateTimeResolver.serialize;
  parseValue = DateTimeResolver.parseValue;
  parseLiteral = DateTimeResolver.parseLiteral;
}
