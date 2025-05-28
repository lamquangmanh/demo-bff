// Register the enum with GraphQL
import { registerEnumType } from '@nestjs/graphql';

// import from common
import { RequestType, UserStatus, SortOrder } from '@/common/constants';

registerEnumType(RequestType, {
  name: 'RequestType', // this will be used in the GraphQL schema
  description: 'RequestType enum', // this is the description that will be used in the GraphQL schema
});

registerEnumType(UserStatus, {
  name: 'UserStatus',
  description: 'UserStatus enum',
});

registerEnumType(SortOrder, {
  name: 'SortOrder',
  description: 'SortOrder enum',
});
