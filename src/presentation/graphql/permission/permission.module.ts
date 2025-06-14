// import from libraries
import { Module } from '@nestjs/common';

// import common module
import { CommonModule } from '../common';

// import from presentation
import { PermissionResolver } from './permission.resolver';

// import from use-cases
import { PermissionUseCase } from '@/use-cases/permission';

@Module({
  imports: [CommonModule],
  providers: [PermissionResolver, PermissionUseCase],
})
export class PermissionModule {}
