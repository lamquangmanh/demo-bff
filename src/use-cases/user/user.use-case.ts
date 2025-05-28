import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import {
  UserService,
  GetUserRequest,
  GetUsersResponse,
  CreateSuccess,
} from '@lamquangmanh/protobuf/dist/user/v1/user';
import {
  UpdateSuccess,
  DeleteSuccess,
} from '@lamquangmanh/protobuf/dist/base/v1/base';

// import from common
import { USER_PACKAGE_NAME, FILTER_LIST_USER } from '@/common/constants';
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
} from '@/domain/use-cases';
import { UserEntity } from '@/domain/entites';

@Injectable()
export class UserUseCase implements OnModuleInit {
  private UserService!: UserService;

  constructor(@Inject(USER_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.UserService = this.client.getService<UserService>('UserService');
  }

  async getUser(request: GetUserRequest): Promise<UserEntity> {
    return await getResultFromGrpc<UserEntity>(
      this.UserService.GetUser(request),
    );
  }

  async getUsers(request: GetListRequest): Promise<GetUsersResponse> {
    const filters: any = convertFilterToBackend(
      request.filters,
      FILTER_LIST_USER,
    );

    return await getResultFromGrpc<GetUsersResponse>(
      this.UserService.GetUsers({
        filters,
        pagination: request.pagination,
        sorts: request.sorts,
      }),
    );
  }

  async createUser(
    request: CreateUserRequest,
    userId: string,
  ): Promise<CreateSuccess | undefined> {
    try {
      return await getResultFromGrpc<CreateSuccess>(
        this.UserService.CreateUser({
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
        this.UserService.UpdateUser({
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
        this.UserService.DeleteUser({
          userId: request.userId,
          deletedUserId: userId,
        }),
      );
    } catch (error: any) {
      throwErrorFromGrpc(error);
    }
  }
}
