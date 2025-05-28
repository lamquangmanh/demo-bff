// import from libraries
import { Module } from '@nestjs/common';

// import common module
import { CommonModule } from '../common';

// import from presentation
import { ModuleResolver } from './module.resolver';

// import from use-cases
import { ModuleUseCase } from '@/use-cases/module';

@Module({
  imports: [CommonModule],
  providers: [ModuleResolver, ModuleUseCase],
})
export class ModuleModule {}
