// import from libraries
import { Module } from '@nestjs/common';

// import common module
import { CommonModule } from '../common';

// import from presentation
import { ModuleResolver } from './module.resolver';

// import from use-cases
import { ModuleUseCase } from '@/use-cases/module';
import { UserUseCase } from '@/use-cases/user';
import { ProductUseCase } from '@/use-cases/product';

@Module({
  imports: [CommonModule],
  providers: [ModuleResolver, ModuleUseCase, UserUseCase, ProductUseCase],
})
export class ModuleModule {}
