export const FILTER_OPERATOR = {
  UNSPECIFIED: 'UNSPECIFIED',
  EQUAL: 'EQUAL',
  NOT_EQUAL: 'NOT_EQUAL',
  GREATER_THAN: 'GREATER_THAN',
  LESS_THAN: 'LESS_THAN',
  GREATER_THAN_OR_EQUAL: 'GREATER_THAN_OR_EQUAL',
  LESS_THAN_OR_EQUAL: 'LESS_THAN_OR_EQUAL',
  LIKE: 'LIKE',
  IN: 'IN',
  NOT_IN: 'NOT_IN',
};

export const FILTER_LIST_MODULE = [
  {
    field: 'moduleId',
    operator: FILTER_OPERATOR.EQUAL,
    valueField: 'stringValue',
  },
  {
    field: 'name',
    operator: FILTER_OPERATOR.LIKE,
    valueField: 'stringValue',
  },
  {
    field: 'description',
    operator: FILTER_OPERATOR.LIKE,
    valueField: 'stringValue',
  },
];

export const FILTER_LIST_RESOURCE = [
  {
    field: 'moduleId',
    operator: FILTER_OPERATOR.EQUAL,
    valueField: 'stringValue',
  },
  {
    field: 'name',
    operator: FILTER_OPERATOR.LIKE,
    valueField: 'stringValue',
  },
  {
    field: 'resourceId',
    operator: FILTER_OPERATOR.EQUAL,
    valueField: 'stringValue',
  },
];

export const FILTER_LIST_ACTION = [
  {
    field: 'actionId',
    operator: FILTER_OPERATOR.EQUAL,
    valueField: 'stringValue',
  },
  {
    field: 'name',
    operator: FILTER_OPERATOR.LIKE,
    valueField: 'stringValue',
  },
  {
    field: 'resourceId',
    operator: FILTER_OPERATOR.EQUAL,
    valueField: 'stringValue',
  },
];

export const FILTER_LIST_USER = [
  {
    field: 'userId',
    operator: FILTER_OPERATOR.EQUAL,
    valueField: 'stringValue',
  },
  {
    field: 'username',
    operator: FILTER_OPERATOR.LIKE,
    valueField: 'stringValue',
  },
  {
    field: 'email',
    operator: FILTER_OPERATOR.LIKE,
    valueField: 'stringValue',
  },
  {
    field: 'roleId',
    operator: FILTER_OPERATOR.EQUAL,
    valueField: 'stringValue',
  },
];

export const FILTER_LIST_ROLE = [
  {
    field: 'roleId',
    operator: FILTER_OPERATOR.EQUAL,
    valueField: 'stringValue',
  },
  {
    field: 'name',
    operator: FILTER_OPERATOR.LIKE,
    valueField: 'stringValue',
  },
  {
    field: 'moduleId',
    operator: FILTER_OPERATOR.EQUAL,
    valueField: 'stringValue',
  },
];

export const FILTER_LIST_PERMISSION = [
  {
    field: 'roleId',
    operator: FILTER_OPERATOR.EQUAL,
    valueField: 'stringValue',
  },
  {
    field: 'permissionId',
    operator: FILTER_OPERATOR.EQUAL,
    valueField: 'stringValue',
  },
  {
    field: 'moduleId',
    operator: FILTER_OPERATOR.EQUAL,
    valueField: 'stringValue',
  },
];
