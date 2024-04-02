import { UseCaseAbstract } from '../abstracts/use-case.abstract';
import { Sample } from '../entities';

export abstract class GetSampleUseCaseAbstract extends UseCaseAbstract<void, Sample> {}
