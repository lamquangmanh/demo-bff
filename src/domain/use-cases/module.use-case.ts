export interface CreateModuleRequest {
  name: string;
  description?: string;
}

export interface UpdateModuleRequest {
  moduleId: string;
  name: string;
  description?: string;
}

export interface DeleteModuleRequest {
  moduleId: string;
}
