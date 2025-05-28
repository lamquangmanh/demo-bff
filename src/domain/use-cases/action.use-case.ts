import { ActionRequestType } from '@lamquangmanh/protobuf/dist/action/v1/action';

export interface CreateActionRequest {
  resourceId: string;
  name: string;
  description: string;
  requestType: ActionRequestType;
  method: string;
  url: string;
}

export interface UpdateActionRequest {
  actionId: string;
  resourceId: string;
  name: string;
  description: string;
  requestType: ActionRequestType;
  method: string;
  url: string;
}

export interface DeleteActionRequest {
  actionId: string;
}
