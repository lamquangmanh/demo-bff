import { lastValueFrom } from 'rxjs';
import { GraphQLFormattedError } from 'graphql';
import { ApolloError } from 'apollo-server-errors';

// import from common
import { FILTER_OPERATOR } from '../constants';

interface FilterResult {
  field: string;
  operator: string;
  stringValue?: string;
  numberValue?: number;
  boolValue?: boolean;
  numberValues?: number[];
  stringValues?: string[];
  boolValues?: boolean[];
}
interface FilterInput {
  field: string;
  value: any;
}
interface FilterMapping {
  field: string;
  operator: string;
  valueField: string;
}

/**
 * Logic to convert filter to backend format.
 * Example: input [{ field: 'name', value: 'John' }] to [{ field: 'name', operator: 'EQUAL', value: { stringValue: 'John' } }]
 * @param filters
 * @param mappingItem
 * @returns
 */
export const convertFilterToBackend = (
  filters: FilterInput[],
  mappingItem: FilterMapping[],
): FilterResult[] => {
  const result: FilterResult[] = [];
  for (const filter of filters) {
    // Check if the filter has a value
    const mapping = mappingItem.find((item) => item.field === filter.field);
    if (!mapping) continue;

    // set value
    const filterItem: FilterResult = {
      field: mapping.field,
      operator: mapping.operator,
      stringValue: undefined,
      numberValue: undefined,
      boolValue: undefined,
      numberValues: [],
      stringValues: [],
      boolValues: [],
    };

    // set value based on operator
    switch (mapping.operator) {
      case FILTER_OPERATOR.EQUAL:
      case FILTER_OPERATOR.NOT_EQUAL:
      case FILTER_OPERATOR.GREATER_THAN:
      case FILTER_OPERATOR.LESS_THAN:
      case FILTER_OPERATOR.GREATER_THAN_OR_EQUAL:
      case FILTER_OPERATOR.LESS_THAN_OR_EQUAL:
      case FILTER_OPERATOR.LIKE:
        filterItem[mapping.valueField] = filter.value;
        break;
      case FILTER_OPERATOR.IN: {
        if (Array.isArray(filter.value)) {
          filterItem[mapping.valueField] = filter.value;
        } else {
          throw new ApolloError(
            `FILTER_OPERATOR.IN requires an array value for field "${filter.value}".`,
            '500',
            { extra: {}, code: 500 },
          );
        }
        break;
      }

      case FILTER_OPERATOR.NOT_IN: {
        if (Array.isArray(filter.value)) {
          filterItem[mapping.valueField] = filter.value;
        } else {
          throw new ApolloError(
            `FILTER_OPERATOR.NOT_IN requires an array value for field "${filter.value}".`,
            '500',
            { extra: {}, code: 500 },
          );
        }
        break;
      }

      default:
        throw new ApolloError(
          `Unsupported filter operator: ${mapping.operator}`,
          '500',
          { extra: {}, code: 500 },
        );
    }

    // Push the filter item to the result array
    result.push(filterItem);
  }
  return result;
};

/**
 * Get result from gRPC query.
 * @param query
 * @returns
 */
export const getResultFromGrpc = async <T>(query: any): Promise<T> => {
  const result: T = await lastValueFrom(query);

  // set data to empty array if not exist
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (!result?.data) result.data = [];

  return result;
};

/**
 * Handle GraphQL formatted error.
 * @param formattedError
 * @returns
 */
export const graphqlFormatError = (
  formattedError: GraphQLFormattedError,
): any => {
  console.error('GraphQL Error:', formattedError);
  const extensions = formattedError?.extensions;

  return {
    message: formattedError?.message ?? 'Internal server error',
    code: extensions?.code ?? 'INTERNAL_SERVER_ERROR',
    extra: extensions?.extra ?? {},
  } as any;
};

/**
 * Throw error from gRPC response.
 * @param error
 * @returns
 */
export const throwErrorFromGrpc = (error: any): any => {
  console.error('gRPC Error:', error);

  // Try to parse error details as JSON, fallback to plain text
  let errorData: any = {};
  try {
    errorData = JSON.parse(error?.details ?? '{}');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e: any) {
    // If not JSON, use plain text message
    errorData = {
      message: error?.details || error?.message || 'Unknown gRPC error',
      code: error?.code || 'INTERNAL_SERVER_ERROR',
    };
  }

  throw new ApolloError(errorData.message, errorData.code, {
    extra: errorData.extra,
  });
};
