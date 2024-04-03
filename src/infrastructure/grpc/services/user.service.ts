import { Injectable } from '@nestjs/common';
import { IUserGrpcService } from '@src/domain/interfaces/grpc-service/user-grpc-service';
import { IUserService } from '@src/domain/interfaces/service/user-service';
import { User } from '@src/domain/models/user.model';
import {
  AddUserDto,
  UpdateUserDto,
  UsersFilterDto,
} from '@src/presentation/graphql/resolvers/user/user.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService implements IUserService {
  private grpcService: IUserGrpcService;

  constructor(service: IUserGrpcService) {
    this.grpcService = service;
  }

  async get(id: number): Promise<User> {
    try {
      const result = await lastValueFrom(this.grpcService.get(id));
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async list(filter: UsersFilterDto): Promise<User[]> {
    try {
      const result = await lastValueFrom(this.grpcService.list(filter));
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      return lastValueFrom(this.grpcService.delete(id));
    } catch (err) {
      console.log(err);
    }
  }

  async update(data: UpdateUserDto): Promise<User> {
    try {
      return lastValueFrom(this.grpcService.update(data));
    } catch (err) {
      console.log(err);
    }
  }

  async create(data: AddUserDto): Promise<User> {
    try {
      return lastValueFrom(this.grpcService.create(data));
    } catch (err) {
      console.log(err);
    }
  }
}
