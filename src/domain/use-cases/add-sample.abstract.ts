import { UseCaseAbstract } from '../abstracts/use-case.abstract';
import { Sample } from '../entities';

export abstract class AddSampleUseCaseAbstract extends UseCaseAbstract<{ name: string }, Sample> {}
