import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ingredient, Product, ProductIngredient, ProductVariant } from 'src/models';
import { CategoryModule } from '../category/category.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [SequelizeModule.forFeature([Product, ProductVariant, Ingredient, ProductIngredient]), CategoryModule],
})
export class ProductModule {}
