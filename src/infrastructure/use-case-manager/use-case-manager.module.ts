import { Module } from '@nestjs/common';
import { AddSampleUseCase, GetSampleUseCase } from '../../application/use-cases/sample';
@Module({
  providers: [GetSampleUseCase, AddSampleUseCase],
  exports: [GetSampleUseCase, AddSampleUseCase],
})
export class UseCaseManagerModule {}
