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

  async getUserById(id: number): Promise<User> {
    try {
      const result = await lastValueFrom(this.grpcService.getUserById(id));
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async getUsers(filter: UsersFilterDto): Promise<User[]> {
    try {
      const result = await lastValueFrom(this.grpcService.getUsers(filter));
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteUser(id: number): Promise<User> {
    try {
      return lastValueFrom(this.grpcService.deleteUser(id));
    } catch (err) {
      console.log(err);
    }
  }

  async updateUser(data: UpdateUserDto): Promise<User> {
    try {
      return lastValueFrom(this.grpcService.updateUser(data));
    } catch (err) {
      console.log(err);
    }
  }

  async addUser(data: AddUserDto): Promise<User> {
    try {
      return lastValueFrom(this.grpcService.addUser(data));
    } catch (err) {
      console.log(err);
    }
  }

  //   async getUser({ name }: { name: string }): Promise<{ name: string }> {
  //     console.log('START');
  //     try {
  //       const result = await lastValueFrom(this.grpcService.getUser({ name }));

  //       return result;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   async getUserStream(): Promise<{ data: number }[]> {
  //     try {
  //       const res = await lastValueFrom(this.grpcService.getUserStream().pipe(toArray()));

  //       return res;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
}
