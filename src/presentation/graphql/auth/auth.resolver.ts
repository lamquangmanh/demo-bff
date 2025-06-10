// import from libraries
import { Resolver, Query, Args, Context } from '@nestjs/graphql';

// import from domain/entities
import { AuthEntity } from '@/domain/entites';

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
  constructor(private readonly useCase: AuthUseCase) {}

  @Query(() => LoginResponse, { name: 'login' })
  async login(@Args() query: LoginRequest): Promise<LoginResponse> {
    const result: LoginResponse | undefined = await this.useCase.login(query);
    if (!result) {
      throw new Error('Login failed: No response from use case');
    }
    return result;
  }

  @Query(() => GetMeResponse, { name: 'getMe' })
  async getMe(@Context('user') user: UserInformation): Promise<GetMeResponse> {
    console.log('getMe called with user:', user);
    const result: GetMeResponse | undefined = await this.useCase.getMe({
      userId: user?.userId,
    } as GetMeRequest);
    if (!result) {
      throw new Error('GetMe failed');
    }
    return result;
  }
}
