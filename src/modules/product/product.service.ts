import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto, ProductVariantDto } from './dto/create-product.dto';
import { Sequelize } from 'sequelize-typescript';
import { CategoryService } from '../category/category.service';
import Helper from 'src/utils/helper';
import { InjectModel } from '@nestjs/sequelize';
import { Category, Ingredient, Product, ProductIngredient, ProductVariant } from 'src/models';
import { FilterProductDto } from './dto/filter-product.dto';
import { Op } from 'sequelize';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductService {
    constructor(
        private readonly sequelize: Sequelize,
        private readonly categoryService: CategoryService,
        @InjectModel(Product) private readonly productModel: typeof Product,
        @InjectModel(Ingredient) private readonly ingredientModel: typeof Ingredient,
        @InjectModel(ProductIngredient) private readonly productIngredientModel: typeof ProductIngredient,
        @InjectModel(ProductVariant) private readonly productVariantModel: typeof ProductVariant,
        private readonly configService: ConfigService,
    ) {}

    async findOne(id: number) {
        return this.productModel.findOne({
            include: [
                {
                    model: ProductVariant,
                    attributes: {
                        include: [
                            [this.sequelize.literal('`Product`.`basePrice` + `productVariants`.`modifiledPrice`'), 'variantPrice']
                        ],
                        exclude: ['createdAt', 'updatedAt', 'modifiledPrice']
                    },
                },
                {
                    model: Category,
                    attributes: ['name', 'slug']
                },
                {
                    model: ProductIngredient,
                    include: [
                        {
                            model: Ingredient,
                            attributes: {exclude: ['createdAt', 'updatedAt']},
                        }
                    ],
                    attributes: ['quantity', 'isDefault']
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'categoryId'],
            },
            where: {
               id,
               isActive: true, 
            }
        });
    }

    async findOneBySlug(slug: string) {
        return this.productModel.findOne({raw: true, where: {slug}});
    }

    async create(createProductDto: CreateProductDto) {
        const t = await this.sequelize.transaction();
        try {
            const category = await this.categoryService.findOne(createProductDto.categoryId);
            if(!category) {
                throw new BadRequestException('Không thấy danh mục');
            }

            const productSlug = Helper.makeSlugFromString(createProductDto.name);
            const product = await this.findOneBySlug(productSlug);
            if(product) {
                throw new BadRequestException('Sản phẩm món ăn tồn tại');
            }

            // Tạo sản phẩm
            const payload: Record<string, any> = {
                name: createProductDto.name,
                slug: productSlug,
                basePrice: createProductDto.basePrice,
                categoryId: createProductDto.categoryId,
                imageUrl: createProductDto.imageUrl,
                isFeatured: createProductDto.isFeatured ?? false,
            } 
            if(createProductDto.description){
                payload.description = createProductDto.description;
            }

            const newProduct = await this.productModel.create(payload as any, {transaction: t});

            // Tạo biến thể
            if(createProductDto.productVariants && createProductDto.productVariants.length > 0 && newProduct) {
                const productId = newProduct.id || newProduct.dataValues?.id;
                const productVariants = createProductDto.productVariants.map((productVariant: ProductVariantDto) => ({
                    ...productVariant,
                    productId
                }))

                await this.productVariantModel.bulkCreate(productVariants as any, {transaction: t})
            }

            // Tạo ingredients
            if(createProductDto.productIngredients && createProductDto.productIngredients.length > 0 && newProduct) {
                const productId = newProduct.id || newProduct.dataValues?.id;
                const ingredientIds = createProductDto.productIngredients.map((ingredient) => ingredient.ingredientId);
                const alreadyExists = await this.ingredientModel.findAll({
                    where: {
                        id: ingredientIds,
                    },
                    attributes: ['id']
                })
                if(alreadyExists.length !== createProductDto.productIngredients.length) {
                    throw new Error('Có vài món topping không tồn tại.');
                }
                const productIngredients = createProductDto.productIngredients.map((productIngredient) => ({
                    ...productIngredient,
                    productId,
                }));
                await this.productIngredientModel.bulkCreate(productIngredients as any, {transaction: t});
            }
        await t.commit();
        return {message: 'Tạo sản phẩm thành công'}
        } catch(error) {
            const message = error.message || 'Tạo sản phẩm thất bại.'
            await t.rollback();
            throw new BadRequestException(message);
        }
    }

    // Todo: Them so sao trung binh
    async findAll(filterProductDto: FilterProductDto) {
        const {
            search,
            isActive,
            isFeatured,
            categoryId,
            sortBy,
            sortOrder,
            maxPrice,
            minPrice,
            page,
            limit
        } = filterProductDto

        const whereClause: any = {}
        if(search !== undefined) {
            whereClause[Op.or] = [
                {name: {[Op.iLike]: `%${search}%`}},   
                {description: {[Op.iLike]: `%${search}%`}}, 
            ];
        }

        if(isActive !== undefined) whereClause.isActive = isActive;
        if(isFeatured !== undefined) whereClause.isFeatured = isFeatured;
        if(categoryId !== undefined) whereClause.categoryId = categoryId;

        const limitPage = Number(limit || this.configService.get<number>("LIMIT_PRODUCTS"));
        const currentPage = Number(page || 1);
        const offset = (currentPage - 1) * limitPage;

        if(minPrice !== undefined || maxPrice !== undefined) {
            whereClause.basePrice = {}
            if(minPrice !== undefined) whereClause.basePrice[Op.gte] = minPrice;
            if(maxPrice !== undefined) whereClause.basePrice[Op.lte] = maxPrice; 
        }

        let orderClause: any[] = [];
        if(sortBy && sortOrder) {
            orderClause = [[sortBy, sortOrder]];
        } else {
            orderClause = [['createdAt', 'DESC']];
        }

        const {rows, count} = await this.productModel.findAndCountAll({
            where: whereClause,
            order: orderClause,
            limit: limitPage,
            offset
        });

        const totalItems = Array.isArray(count) ? count.length : count;

        return {
            items: rows,
            paginationMeta: {
                totalItems,
                currentPage,
                limit: limitPage,
                totalPages: Math.ceil(totalItems / limitPage),
            }
        }
    }

    async removeSoft(id: number) {
        await this.productModel.update(
            { isActive: false},
            {where: {id}},
        );
        return { message: 'Đã xóa sản phẩm'};
    } 

    async removeHard(id: number) {
        await this.productModel.destroy({where: {id}, cascade: true});
        return { message: 'Đã xóa sản phẩm'}
    }
}
