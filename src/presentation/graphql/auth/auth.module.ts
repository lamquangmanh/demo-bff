// import from libraries
import { Module } from '@nestjs/common';

// import common module
import { CommonModule } from '../common';

// import from presentation
import { AuthResolver } from './auth.resolver';

// import from use-cases
import { AuthUseCase } from '@/use-cases/auth';

@Module({
  imports: [CommonModule],
  providers: [AuthResolver, AuthUseCase],
})
export class AuthModule {}
