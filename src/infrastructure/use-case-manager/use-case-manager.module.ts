import { Module } from '@nestjs/common';
import { AddSampleUseCase, GetSampleUseCase } from '../../application/use-cases/sample';
import { ClientGRPCModule } from '../grpc/client-GRPC.module';
import { GetSampleUseCaseAbstract, AddSampleUseCaseAbstract } from '../../domain/use-cases';

@Module({
  imports: [ClientGRPCModule],
  providers: [
    { provide: GetSampleUseCaseAbstract, useClass: GetSampleUseCase },
    { provide: AddSampleUseCaseAbstract, useClass: AddSampleUseCase },
  ],
  exports: [GetSampleUseCaseAbstract, AddSampleUseCaseAbstract],
})
export class UseCaseManagerModule {}
