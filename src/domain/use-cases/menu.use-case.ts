import { SuperMenu } from '@lamquangmanh/protobuf/dist/proto/menu/v1/menu';

export interface GetSuperMenusRequest {
  userId: string;
}

export interface GetSuperMenusResponse {
  superMenus: SuperMenu[];
}
