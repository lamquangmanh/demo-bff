import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import {
  UserService,
  GetUserRequest,
  // GetUsersResponse,
  CreateSuccess,
} from '@lamquangmanh/protobuf/dist/user/v1/user';
import {
  UpdateSuccess,
  DeleteSuccess,
  FilterOperator,
} from '@lamquangmanh/protobuf/dist/base/v1/base';

// import from common
import {
  USER_PACKAGE_NAME,
  FILTER_LIST_USER,
  UserStatus,
} from '@/common/constants';
import { GetListRequest } from '@/common/interfaces';
import {
  convertFilterToBackend,
  getResultFromGrpc,
  throwErrorFromGrpc,
} from '@/common/utils';

// import from domain
import {
  CreateUserRequest,
  UpdateUserRequest,
  DeleteUserRequest,
  GetUsersResponse,
} from '@/domain/use-cases';
import { UserEntity } from '@/domain/entites';

@Injectable()
export class UserUseCase implements OnModuleInit {
  private userService!: UserService;

  constructor(@Inject(USER_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  async findByIds(ids: string[]): Promise<UserEntity[]> {
    const result: GetUsersResponse = await getResultFromGrpc<GetUsersResponse>(
      this.userService.GetUsers({
        filters: [
          {
            field: 'userId',
            operator: FilterOperator.IN,
            stringValues: ids,
            boolValues: [],
            numberValues: [],
          },
        ],
        pagination: { page: 1, limit: ids.length },
        sorts: [],
      }),
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return result?.data ?? [];
  }

  async getUser(request: GetUserRequest): Promise<UserEntity> {
    return await getResultFromGrpc<UserEntity>(
      this.userService.GetUser(request),
    );
  }

  async getUsers(request: GetListRequest): Promise<GetUsersResponse> {
    const filters: any = convertFilterToBackend(
      request.filters,
      FILTER_LIST_USER,
    );

    const result = await getResultFromGrpc<GetUsersResponse>(
      this.userService.GetUsers({
        filters,
        pagination: request.pagination,
        sorts: request.sorts,
      }),
    );

    return {
      ...result,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      data: result.data.map((user) => ({
        ...user,
        // Assuming UserStatus is compatible with the backend
        status: user.status as unknown as UserStatus,
      })),
    };
  }

  async createUser(
    request: CreateUserRequest,
    userId: string,
  ): Promise<UserEntity | undefined> {
    try {
      const result = await getResultFromGrpc<CreateSuccess>(
        this.userService.CreateUser({
          user: {
            username: request.username,
            email: request.email,
            password: request.password,
            phone: request.phone,
            avatar: request.avatar,
            // Assuming UserStatus is compatible with the backend
            status: request.status as any,
            roleIds: request.roleIds || [],
          },
          userId,
        }),
      );

      if (!result.user) return undefined;

      return {
        ...result.user,
        status: result.user.status as unknown as UserStatus,
      };
    } catch (error: any) {
      throwErrorFromGrpc(error);
    }
  }

  async updateUser(
    request: UpdateUserRequest,
    userId: string,
  ): Promise<UpdateSuccess | undefined> {
    try {
      return await getResultFromGrpc<UpdateSuccess>(
        this.userService.UpdateUser({
          user: {
            userId: request.userId,
            username: request.username,
            email: request.email,
            phone: request.phone,
            avatar: request.avatar,
            // Assuming UserStatus is compatible with the backend
            status: request.status as any,
            roleIds: request.roleIds || [],
          },
          userId,
        }),
      );
    } catch (error: any) {
      throwErrorFromGrpc(error);
    }
  }

  async deleteUser(
    request: DeleteUserRequest,
    userId: string,
  ): Promise<DeleteSuccess | undefined> {
    try {
      return await getResultFromGrpc<DeleteSuccess>(
        this.userService.DeleteUser({
          userId: request.userId,
          deletedUserId: userId,
        }),
      );
    } catch (error: any) {
      throwErrorFromGrpc(error);
    }
  }
}
