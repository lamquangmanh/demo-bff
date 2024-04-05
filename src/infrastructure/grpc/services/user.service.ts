import { Injectable } from '@nestjs/common';
import { LoggerAbstract } from '@src/domain/abstracts/logger.abstract';
import { User } from '@src/domain/entities';
import { IUserGrpcService } from '@src/domain/interfaces/grpc-service/user-grpc-service';
import { AddUserRequest, GetUsersRequest, UpdateUserRequest } from '@src/domain/interfaces/request';
import {
  DeleteUserResponse,
  GetUsersResponse,
  UpdateUserResponse,
} from '@src/domain/interfaces/response';
import { IUserService } from '@src/domain/interfaces/service/user-service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService implements IUserService {
  private userGrpcService: IUserGrpcService;
  private logger: LoggerAbstract;

  constructor(service: IUserGrpcService, _logger: LoggerAbstract) {
    this.userGrpcService = service;
    this.logger = _logger;
  }

  async getUser(id: number): Promise<User> {
    try {
      const result = await lastValueFrom(this.userGrpcService.getUser(id));
      return result;
    } catch (err) {
      this.logger.error(UserService.name + JSON.stringify(err));
    }
  }

  async listUser(filter: GetUsersRequest): Promise<GetUsersResponse> {
    try {
      const result = await lastValueFrom(this.userGrpcService.listUser(filter));
      return result;
    } catch (err) {
      this.logger.error(UserService.name + JSON.stringify(err));
    }
  }

  async deleteUser(id: number): Promise<DeleteUserResponse> {
    try {
      return lastValueFrom(this.userGrpcService.deleteUser(id));
    } catch (err) {
      this.logger.error(UserService.name + JSON.stringify(err));
    }
  }

  async updateUser(data: UpdateUserRequest): Promise<UpdateUserResponse> {
    try {
      return lastValueFrom(this.userGrpcService.updateUser(data));
    } catch (err) {
      this.logger.error(UserService.name + JSON.stringify(err));
    }
  }

  async addUser(data: AddUserRequest): Promise<User> {
    try {
      return lastValueFrom(this.userGrpcService.addUser(data));
    } catch (err) {
      this.logger.error(UserService.name + JSON.stringify(err));
    }
  }
}
