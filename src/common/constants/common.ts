import { FilterOperator } from '@lamquangmanh/protobuf/dist/proto/base/v1/base';
import { RequestType } from './enum';

// export const FILTER_OPERATOR = {
//   UNSPECIFIED: 'UNSPECIFIED',
//   EQUAL: 'EQUAL',
//   NOT_EQUAL: 'NOT_EQUAL',
//   GREATER_THAN: 'GREATER_THAN',
//   LESS_THAN: 'LESS_THAN',
//   GREATER_THAN_OR_EQUAL: 'GREATER_THAN_OR_EQUAL',
//   LESS_THAN_OR_EQUAL: 'LESS_THAN_OR_EQUAL',
//   LIKE: 'LIKE',
//   IN: 'IN',
//   NOT_IN: 'NOT_IN',
// };

export const FILTER_LIST_MODULE = [
  {
    field: 'productId',
    operator: FilterOperator.FILTER_OPERATOR_EQUAL,
    valueField: 'stringValue',
  },
  {
    field: 'moduleId',
    operator: FilterOperator.FILTER_OPERATOR_EQUAL,
    valueField: 'stringValue',
  },
  {
    field: 'name',
    operator: FilterOperator.FILTER_OPERATOR_LIKE,
    valueField: 'stringValue',
  },
  {
    field: 'description',
    operator: FilterOperator.FILTER_OPERATOR_LIKE,
    valueField: 'stringValue',
  },
];

export const FILTER_LIST_RESOURCE = [
  {
    field: 'moduleId',
    operator: FilterOperator.FILTER_OPERATOR_EQUAL,
    valueField: 'stringValue',
  },
  {
    field: 'name',
    operator: FilterOperator.FILTER_OPERATOR_LIKE,
    valueField: 'stringValue',
  },
  {
    field: 'resourceId',
    operator: FilterOperator.FILTER_OPERATOR_EQUAL,
    valueField: 'stringValue',
  },
];

export const FILTER_LIST_ACTION = [
  {
    field: 'actionId',
    operator: FilterOperator.FILTER_OPERATOR_EQUAL,
    valueField: 'stringValue',
  },
  {
    field: 'name',
    operator: FilterOperator.FILTER_OPERATOR_LIKE,
    valueField: 'stringValue',
  },
  {
    field: 'resourceId',
    operator: FilterOperator.FILTER_OPERATOR_EQUAL,
    valueField: 'stringValue',
  },
];

export const FILTER_LIST_USER = [
  {
    field: 'userId',
    operator: FilterOperator.FILTER_OPERATOR_EQUAL,
    valueField: 'stringValue',
  },
  {
    field: 'username',
    operator: FilterOperator.FILTER_OPERATOR_LIKE,
    valueField: 'stringValue',
  },
  {
    field: 'email',
    operator: FilterOperator.FILTER_OPERATOR_LIKE,
    valueField: 'stringValue',
  },
  {
    field: 'roleId',
    operator: FilterOperator.FILTER_OPERATOR_EQUAL,
    valueField: 'stringValue',
  },
  {
    field: 'status',
    operator: FilterOperator.FILTER_OPERATOR_EQUAL,
    valueField: 'stringValue',
  },
  {
    field: 'phone',
    operator: FilterOperator.FILTER_OPERATOR_LIKE,
    valueField: 'stringValue',
  },
];

export const FILTER_LIST_ROLE = [
  {
    field: 'roleId',
    operator: FilterOperator.FILTER_OPERATOR_EQUAL,
    valueField: 'stringValue',
  },
  {
    field: 'name',
    operator: FilterOperator.FILTER_OPERATOR_LIKE,
    valueField: 'stringValue',
  },
  {
    field: 'moduleId',
    operator: FilterOperator.FILTER_OPERATOR_EQUAL,
    valueField: 'stringValue',
  },
];

export const FILTER_LIST_PERMISSION = [
  {
    field: 'roleId',
    operator: FilterOperator.FILTER_OPERATOR_EQUAL,
    valueField: 'stringValue',
  },
  {
    field: 'permissionId',
    operator: FilterOperator.FILTER_OPERATOR_EQUAL,
    valueField: 'stringValue',
  },
  {
    field: 'moduleId',
    operator: FilterOperator.FILTER_OPERATOR_EQUAL,
    valueField: 'stringValue',
  },
];

export const FILTER_LIST_PRODUCT = [
  {
    field: 'productId',
    operator: FilterOperator.FILTER_OPERATOR_EQUAL,
    valueField: 'stringValue',
  },
  {
    field: 'name',
    operator: FilterOperator.FILTER_OPERATOR_LIKE,
    valueField: 'stringValue',
  },
];

export const REQUEST_TYPE_MAPPING = {
  0: RequestType.VIEW,
  1: RequestType.HTTP,
  2: RequestType.GRAPHQL,
  3: RequestType.GRPC,
  4: RequestType.WEBSOCKET,
};
