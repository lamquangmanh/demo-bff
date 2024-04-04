import { UseCaseAbstract } from '@src/domain/abstracts/use-case.abstract';
import { UpdateUserRequest } from '@src/domain/interfaces/request';
import { UpdateUserResponse } from '@src/domain/interfaces/response';

export abstract class UpdateUserUseCaseAbstract extends UseCaseAbstract<
  UpdateUserRequest,
  UpdateUserResponse
> {}
