import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import {
  LoginRequest,
  LoginResponse,
  VerifyRequest,
  VerifyResponse,
  GetMeRequest,
  GetMeResponse,
  AuthService,
} from '@lamquangmanh/protobuf/dist/auth/v1/auth';

// import from common
import { USER_PACKAGE_NAME } from '@/common/constants';
import { getResultFromGrpc, throwErrorFromGrpc } from '@/common/utils';

@Injectable()
export class AuthUseCase implements OnModuleInit {
  private authService!: AuthService;

  constructor(@Inject(USER_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthService>('AuthService');
  }

  async login(request: LoginRequest): Promise<LoginResponse | undefined> {
    try {
      return await getResultFromGrpc<LoginResponse>(
        this.authService.Login(request),
      );
    } catch (error) {
      console.error('Error during login:', error);
      throwErrorFromGrpc(error);
    }
  }

  async verify(request: VerifyRequest): Promise<VerifyResponse | undefined> {
    try {
      return await getResultFromGrpc<VerifyResponse>(
        this.authService.Verify(request),
      );
    } catch (error) {
      throwErrorFromGrpc(error);
    }
  }

  async getMe(request: GetMeRequest): Promise<GetMeResponse | undefined> {
    try {
      return await getResultFromGrpc<GetMeResponse>(
        this.authService.GetMe(request),
      );
    } catch (error) {
      throwErrorFromGrpc(error);
    }
  }
}
