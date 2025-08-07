import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category, Ingredient, Product, ProductIngredient, ProductVariant, User } from 'src/models';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [SequelizeModule.forFeature([User, Category, Product, ProductVariant, Ingredient, ProductIngredient])]
})
export class SeedModule {}
