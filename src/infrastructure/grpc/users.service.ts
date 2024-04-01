import { Injectable } from '@nestjs/common';
import { lastValueFrom, toArray } from 'rxjs';
import { IUserGrpcService } from 'src/domain/interfaces/grpcService/IUserGrpcService';
import { IUserService } from 'src/domain/interfaces/service/IUserService';

@Injectable()
export class UserService implements IUserService {
  private grpcService: IUserGrpcService;

  constructor(service: IUserGrpcService) {
    this.grpcService = service;
  }

  async getUser({ name }: { name: string }): Promise<{ name: string }> {
    console.log('START');
    try {
      const result = await lastValueFrom(this.grpcService.getUser({ name }));

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getUserStream(): Promise<{ data: number }[]> {
    try {
      const res = await lastValueFrom(this.grpcService.getUserStream().pipe(toArray()));

      return res;
    } catch (error) {
      console.log(error);
    }
  }
}
