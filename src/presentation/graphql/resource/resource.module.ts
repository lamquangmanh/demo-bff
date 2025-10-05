// import from libraries
import { Module } from '@nestjs/common';

// import from common

// import common module
import { CommonModule } from '../common';

// import from presentation
import { ResourceResolver } from './resource.resolver';

// import from use-cases
import { ResourceUseCase } from '@/use-cases/resource';
import { UserUseCase } from '@/use-cases/user';

@Module({
  imports: [CommonModule],
  providers: [ResourceResolver, ResourceUseCase, UserUseCase],
})
export class ResourceModule {}
