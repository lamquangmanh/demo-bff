import { Injectable, Inject, OnModuleInit, Logger } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import {
  LoginRequest,
  LoginResponse,
  VerifyRequest,
  VerifyResponse,
  GetMeRequest,
  GetMeResponse,
  AuthService,
} from '@lamquangmanh/protobuf/dist/proto/auth/v1/auth';

// import from common
import { USER_PACKAGE_NAME } from '@/common/constants';
import { getResultFromGrpc, throwErrorFromGrpc } from '@/common/utils';

// import from domain/use-cases
import {
  LoginResponse as AuthLoginResponse,
  VerifyResponse as AuthVerifyResponse,
  GetMeResponse as AuthGetMeResponse,
} from '@/domain/use-cases';

@Injectable()
export class AuthUseCase implements OnModuleInit {
  private authService!: AuthService;
  private readonly logger = new Logger(AuthUseCase.name);

  constructor(@Inject(USER_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthService>('AuthService');
  }

  async login(request: LoginRequest): Promise<AuthLoginResponse | undefined> {
    try {
      const result = await getResultFromGrpc<LoginResponse>(
        this.authService.Login(request),
      );
      this.logger.log(`Login successful for user: ${JSON.stringify(result)}`);
      return result.auth as AuthLoginResponse;
    } catch (error) {
      this.logger.error('Error during login: ', JSON.stringify(error));
      throwErrorFromGrpc(error);
    }
  }

  async verify(
    request: VerifyRequest,
  ): Promise<AuthVerifyResponse | undefined> {
    try {
      const result = await getResultFromGrpc<VerifyResponse>(
        this.authService.Verify(request),
      );
      this.logger.log(`Verify successful: ${JSON.stringify(result)}`);
      return result as AuthVerifyResponse;
    } catch (error) {
      this.logger.error('Error during verify: ', error);
      throwErrorFromGrpc(error);
    }
  }

  async getMe(request: GetMeRequest): Promise<AuthGetMeResponse | undefined> {
    try {
      const result = await getResultFromGrpc<GetMeResponse>(
        this.authService.GetMe(request),
      );
      return result.user as AuthGetMeResponse;
    } catch (error) {
      this.logger.error('Error during getMe: ', error);
      throwErrorFromGrpc(error);
    }
  }
}
