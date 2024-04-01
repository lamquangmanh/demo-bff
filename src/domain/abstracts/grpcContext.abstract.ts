import { IUserService } from '../interfaces/service/IUserService';

export abstract class GrpcContextAbstract {
  abstract userService: IUserService;
}
