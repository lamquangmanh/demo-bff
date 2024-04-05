import { UseCaseAbstract } from '@src/domain/abstracts/use-case.abstract';
import { User } from '@src/domain/entities';
import { AddUserRequest } from '@src/domain/interfaces/request';

export abstract class AddUserUseCaseAbstract extends UseCaseAbstract<AddUserRequest, User> {}
