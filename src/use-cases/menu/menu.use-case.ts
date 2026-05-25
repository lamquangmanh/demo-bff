import { Injectable, Inject, OnModuleInit, Logger } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApolloError } from 'apollo-server-errors';

import {
  MenuService,
  GetSuperMenusResponse,
} from '@lamquangmanh/protobuf/dist/proto/menu/v1/menu';

// import from common
import { USER_PACKAGE_NAME } from '@/common/constants';
import { getResultFromGrpc, throwErrorFromGrpc } from '@/common/utils';

// import from domain/use-cases
import { GetSuperMenusResponse as AuthGetSuperMenusResponse } from '@/domain/use-cases';

@Injectable()
export class MenuUseCase implements OnModuleInit {
  private menuService!: MenuService;
  private readonly logger = new Logger(MenuUseCase.name);

  constructor(@Inject(USER_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.menuService = this.client.getService<MenuService>('MenuService');
  }

  async getSuperMenus(
    userId: string,
  ): Promise<AuthGetSuperMenusResponse | undefined> {
    try {
      const result = await getResultFromGrpc<GetSuperMenusResponse>(
        this.menuService.GetSuperMenus({
          userId,
        }),
      );

      // check if result is invalid
      if (!result || !result.superMenus) {
        this.logger.error(`Grpc error, userId: ${userId}`);
        throw new ApolloError('Grpc error', '500', {});
      }

      return result;
    } catch (error: any) {
      this.logger.error('Error during getSuperMenus: ', error);
      throwErrorFromGrpc(error);
    }
  }
}
