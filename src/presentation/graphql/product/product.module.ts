// import from libraries
import { Module } from '@nestjs/common';

// import common module
import { CommonModule } from '../common';

// import from presentation
import { ProductResolver } from './product.resolver';

// import from use-cases
import { ProductUseCase } from '@/use-cases/product';

@Module({
  imports: [CommonModule],
  providers: [ProductResolver, ProductUseCase],
})
export class ProductModule {}
