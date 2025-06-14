// import from libraries
import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

export type AllowedValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | boolean[];

function isAllowedValue(value: any): value is AllowedValue {
  const isArray = Array.isArray(value);
  const scalarCheck = (v: any) =>
    typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean';

  if (scalarCheck(value)) return true;
  if (isArray && value.every(scalarCheck)) return true;

  return false;
}

@Scalar('FlexibleValueScalar', () => FlexibleValueScalar)
export class FlexibleValueScalar
  implements CustomScalar<unknown, AllowedValue>
{
  description =
    'FlexibleScalar supports string, number, boolean, or their arrays';

  parseValue(value: unknown): AllowedValue {
    if (!isAllowedValue(value)) {
      throw new Error('Invalid FlexibleScalar value');
    }
    return value;
  }

  serialize(value: unknown): AllowedValue {
    if (!isAllowedValue(value)) {
      throw new Error('Invalid FlexibleScalar value');
    }
    return value;
  }

  // parseLiteral(ast: ValueNode): AllowedValue {
  //   switch (ast.kind) {
  //     case Kind.STRING:
  //       return ast.value;
  //     case Kind.BOOLEAN:
  //       return ast.value;
  //     case Kind.INT:
  //       return parseInt(ast.value, 10);
  //     case Kind.FLOAT:
  //       return parseFloat(ast.value);
  //     case Kind.LIST:
  //       const values = ast.values.map((v) => {
  //         if (v.kind === Kind.STRING) return v.value;
  //         if (v.kind === Kind.BOOLEAN) return v.value;
  //         if (v.kind === Kind.INT) return parseInt(v.value, 10);
  //         if (v.kind === Kind.FLOAT) return parseFloat(v.value);
  //         throw new Error('Invalid list value in FlexibleScalar');
  //       });

  //       const baseType = typeof values[0];
  //       if (!values.every((v) => typeof v === baseType)) {
  //         throw new Error('Array elements must be of the same primitive type');
  //       }

  //       return values;
  //     default:
  //       throw new Error('Unsupported literal for FlexibleScalar');
  //   }
  // }

  parseLiteral(ast: ValueNode): AllowedValue {
    switch (ast.kind) {
      case Kind.STRING:
        return ast.value;
      case Kind.BOOLEAN:
        return ast.value;
      case Kind.INT:
        return parseInt(ast.value, 10);
      case Kind.FLOAT:
        return parseFloat(ast.value);
      case Kind.LIST: {
        const values = ast.values.map((v) => {
          if (v.kind === Kind.STRING) return v.value;
          if (v.kind === Kind.BOOLEAN) return v.value;
          if (v.kind === Kind.INT) return parseInt(v.value, 10);
          if (v.kind === Kind.FLOAT) return parseFloat(v.value);
          throw new Error('Invalid list value in FlexibleScalar');
        });

        const baseType = typeof values[0];
        if (!values.every((v) => typeof v === baseType)) {
          throw new Error('Array elements must be of the same primitive type');
        }

        return values as AllowedValue;
      }
      default:
        throw new Error('Unsupported literal for FlexibleScalar');
    }
  }
}
