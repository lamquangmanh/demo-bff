// import from libraries
import { Module } from '@nestjs/common';

// import common module
import { CommonModule } from '../common';

// import from presentation
import { ActionResolver } from './action.resolver';

// import from use-cases
import { ActionUseCase } from '@/use-cases/action';

@Module({
  imports: [CommonModule],
  providers: [ActionResolver, ActionUseCase],
})
export class ActionModule {}
