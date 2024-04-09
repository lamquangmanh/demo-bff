import { Scalar, CustomScalar } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@Scalar('Json')
export class JsonScalar implements CustomScalar<any, any> {
  description = 'json custom scalar type';

  parseValue(value) {
    return GraphQLJSON.parseValue(value);
  }

  serialize(value: any) {
    return GraphQLJSON.serialize(value);
  }

  parseLiteral(ast) {
    return GraphQLJSON.parseLiteral(ast, ast.value);
  }
}
