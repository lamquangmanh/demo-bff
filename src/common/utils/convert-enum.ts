import { UserStatus as ProtoUserStatus } from '@lamquangmanh/protobuf/dist/proto/user/v1/user';

// import from common
import { UserStatus } from '@/common/constants';

/**
 * Map protobuf UserStatus (numeric enum) to GraphQL UserStatus (string enum)
 */
export function mapUserStatus(protoStatus: ProtoUserStatus): UserStatus {
  switch (protoStatus) {
    case ProtoUserStatus.USER_STATUS_ACTIVE:
      return UserStatus.ACTIVE;
    case ProtoUserStatus.USER_STATUS_DEACTIVATED:
      return UserStatus.DEACTIVATED;
    case ProtoUserStatus.USER_STATUS_DELETED:
      return UserStatus.DELETED;
    case ProtoUserStatus.USER_STATUS_UNSPECIFIED:
    default:
      return UserStatus.USER_STATUS_UNSPECIFIED;
  }
}

/**
 * Map GraphQL UserStatus (string enum) to protobuf UserStatus (numeric enum)
 */
export function mapUserStatusToProto(
  graphQLStatus: UserStatus,
): ProtoUserStatus {
  switch (graphQLStatus) {
    case UserStatus.ACTIVE:
      return ProtoUserStatus.USER_STATUS_ACTIVE;
    case UserStatus.DEACTIVATED:
      return ProtoUserStatus.USER_STATUS_DEACTIVATED;
    case UserStatus.DELETED:
      return ProtoUserStatus.USER_STATUS_DELETED;
    case UserStatus.USER_STATUS_UNSPECIFIED:
    default:
      return ProtoUserStatus.USER_STATUS_UNSPECIFIED;
  }
}
