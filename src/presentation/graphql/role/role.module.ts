// import from libraries
import { Module } from '@nestjs/common';

// import from common

// import common module
import { CommonModule } from '../common';

// import from presentation
import { RoleResolver } from './role.resolver';

// import from use-cases
import { RoleUseCase } from '@/use-cases/role';

@Module({
  imports: [CommonModule],
  providers: [RoleResolver, RoleUseCase],
})
export class RoleModule {}
