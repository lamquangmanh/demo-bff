// import from libraries
import { Logger } from '@nestjs/common';
import { Resolver, Query, Args, Context } from '@nestjs/graphql';

// import from domain/entities
import { AuthEntity } from '@/domain/entities';

// import from use-cases
import { AuthUseCase } from '@/use-cases/auth';

// import from common
import { UserInformation } from '@/common/interfaces';

// import from presentation
import {
  LoginRequest,
  LoginResponse,
  GetMeRequest,
  GetMeResponse,
} from './dtos';

@Resolver(() => AuthEntity)
export class AuthResolver {
  private readonly logger = new Logger(AuthResolver.name);

  constructor(private readonly useCase: AuthUseCase) {}

  @Query(() => LoginResponse, { name: 'login' })
  async login(
    @Args() query: LoginRequest,
    @Context() context: any,
  ): Promise<LoginResponse> {
    const result: LoginResponse | undefined = await this.useCase.login(query);
    if (!result) {
      this.logger.error('Login failed: No response from use case');
      throw new Error('Login failed: No response from use case');
    }

    // Set HttpOnly cookie
    context.res.cookie('access_token', result.accessToken, {
      httpOnly: true,
      secure: true, // true if using HTTPS
      sameSite: 'strict',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });
    context.res.cookie('refresh_token', result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    return { ...result, success: true };
  }

  @Query(() => GetMeResponse, { name: 'getMe' })
  async getMe(@Context() context: any): Promise<GetMeResponse> {
    const user: UserInformation = context.user;
    this.logger.log('getMe called with user:', user);
    const result: GetMeResponse | undefined = await this.useCase.getMe({
      userId: user?.userId,
    } as GetMeRequest);
    if (!result) {
      this.logger.error('GetMe failed: No response from use case');
      throw new Error('GetMe failed');
    }
    return result;
  }
}
