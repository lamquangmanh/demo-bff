export interface CreateModuleRequest {
  name: string;
  productId: string;
  description?: string;
  url?: string;
  icon?: string;
}

export interface UpdateModuleRequest extends CreateModuleRequest {
  moduleId: string;
}

export interface DeleteModuleRequest {
  moduleId: string;
}
