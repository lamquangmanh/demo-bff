// import from libraries
import { Module } from '@nestjs/common';

// import common module
import { CommonModule } from '../common';

// import from presentation
import { MenuResolver } from './menu.resolver';

// import from use-cases
import { MenuUseCase } from '@/use-cases/menu';

@Module({
  imports: [CommonModule],
  providers: [MenuResolver, MenuUseCase],
})
export class MenuModule {}
