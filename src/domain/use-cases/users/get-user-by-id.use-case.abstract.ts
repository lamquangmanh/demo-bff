import { UseCaseAbstract } from '@src/domain/abstracts/use-case.abstract';
import { User } from '@src/domain/entities';

export abstract class GetUserByIdUseCaseAbstract extends UseCaseAbstract<number, User> {}
