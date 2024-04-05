import { UseCaseAbstract } from '@src/domain/abstracts/use-case.abstract';
import { DeleteUserResponse } from '@src/domain/interfaces/response';

export abstract class DeleteUserUseCaseAbstract extends UseCaseAbstract<
  number,
  DeleteUserResponse
> {}
