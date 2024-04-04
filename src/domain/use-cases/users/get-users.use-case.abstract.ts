import { UseCaseAbstract } from '@src/domain/abstracts/use-case.abstract';
import { GetUsersRequest } from '@src/domain/interfaces/request';
import { GetUsersResponse } from '@src/domain/interfaces/response';

export abstract class GetUsersUseCaseAbstract extends UseCaseAbstract<
  GetUsersRequest,
  GetUsersResponse
> {}
