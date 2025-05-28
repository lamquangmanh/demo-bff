import { ActionRequestType } from '@lamquangmanh/protobuf/dist/action/v1/action';

export interface ActionItem {
  actionId?: string;
  name: string;
  description: string;
  requestType: ActionRequestType;
  method: string;
  url: string;
}

export interface CreateResourceRequest {
  name: string;
  moduleId: string;
  actions: ActionItem[];
}

export interface UpdateResourceRequest {
  resourceId: string;
  moduleId: string;
  name: string;
  actions: ActionItem[];
}

export interface DeleteResourceRequest {
  resourceId: string;
}
