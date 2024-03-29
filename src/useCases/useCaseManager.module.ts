import { Module } from '@nestjs/common';
import { AddSampleUseCase, GetSampleUseCase } from './sample';
@Module({
  providers: [GetSampleUseCase, AddSampleUseCase],
  exports: [GetSampleUseCase, AddSampleUseCase],
})
export class UseCaseManagerModule {}
