export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface VerifyRequest {
  token: string;
  requestType: string;
  method: string;
  url: string;
}

export interface VerifyResponse {
  success: boolean;
}

export interface GetMeRequest {
  userId: string;
}

export interface GetMeResponse {
  userId: string;
  email: string;
  username: string;
  avatar?: string;
  phone?: string;
  status: string;
}
