import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import {
  MenuService,
  GetSuperMenuResponse,
} from '@lamquangmanh/protobuf/dist/menu/v1/menu';

// import from common
import { USER_PACKAGE_NAME } from '@/common/constants';
import { getResultFromGrpc, throwErrorFromGrpc } from '@/common/utils';

@Injectable()
export class MenuUseCase implements OnModuleInit {
  private menuService!: MenuService;

  constructor(@Inject(USER_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.menuService = this.client.getService<MenuService>('MenuService');
  }

  async getSuperMenus(
    userId: string,
  ): Promise<GetSuperMenuResponse | undefined> {
    try {
      return await getResultFromGrpc<GetSuperMenuResponse>(
        this.menuService.GetSuperMenus({
          userId,
        }),
      );
    } catch (error: any) {
      throwErrorFromGrpc(error);
    }
  }
}
