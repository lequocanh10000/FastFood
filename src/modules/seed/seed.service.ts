import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category, Ingredient, Product, ProductIngredient, ProductVariant, User } from 'src/models';
import { categories, combos, ingredients, productIngredients, products, productVariants, users } from './data';
import * as bcrypt from 'bcryptjs';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';

@Injectable()
export class SeedService {
    constructor(
        @InjectModel(User) private readonly userModel: typeof User,
        @InjectModel(Category) private readonly categoryModel: typeof Category,
        @InjectModel(Product) private readonly productModel: typeof Product,
        @InjectModel(ProductVariant) private readonly productVariantModel: typeof ProductVariant,
        @InjectModel(Ingredient) private readonly ingredientModel: typeof Ingredient,
        @InjectModel(ProductIngredient) private readonly productIngredientModel: typeof ProductIngredient,
        private readonly sequelize: Sequelize,

    ) {}

    private async seedUsers(transaction: Transaction) {
        const userWithHashedPassword = users.map((user) => {
            const hashedPassword = bcrypt.hashSync(user.password, 10);
            return{...user, password: hashedPassword};
        })
        return await this.userModel.bulkCreate(userWithHashedPassword as any, { transaction});
    }

    private async seedCategories(transaction: Transaction) {
        return await this.categoryModel.bulkCreate(categories as any, { transaction});
    }

    private async seedIngredients(transaction: Transaction) {
        return await this.ingredientModel.bulkCreate(ingredients as any, { transaction});
    }

    private async seedProducts(transaction: Transaction) {
        const allProducts = [...products, ...combos];
        return this.productModel.bulkCreate(allProducts as any, { transaction});
    }

    private async seedProductVariants(transaction: Transaction) {
        return await this.productVariantModel.bulkCreate(productVariants as any, { transaction});
    }

    private async seedProductIngredients(transaction: Transaction) {
        return await this.productIngredientModel.bulkCreate(productIngredients as any, { transaction});
    }

    async initSeedData() {
        const transaction = await this.sequelize.transaction(); // trả lại các thao tác trước đó
        try {
            await this.seedUsers(transaction);
            await this.seedCategories(transaction);
            await this.seedIngredients(transaction);
            await this.seedProducts(transaction);
            await this.seedProductVariants(transaction);
            await this.seedProductIngredients(transaction);

            await transaction.commit();
            return { message: 'Seed data success'}
        } catch(error) {
            await transaction.rollback();
            throw new BadRequestException('Seed data failed');
        }
    }
}
