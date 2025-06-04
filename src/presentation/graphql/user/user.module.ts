// import from libraries
import { Module } from '@nestjs/common';

// import from common

// import common module
import { CommonModule } from '../common';

// import from presentation
import { UserResolver } from './user.resolver';

// import from use-cases
import { UserUseCase } from '@/use-cases/user';

@Module({
  imports: [CommonModule],
  providers: [UserResolver, UserUseCase],
})
export class UserModule {}
