import { ArrayNotRequired, BooleanNotRequired, EnumRequired, NumberRequired, StringNotRequired, StringRequired } from "src/common/decorators";
import { ProductVariantSize, ProductVariantType } from "src/models";

export class ProductVariantDto {
    @StringRequired('Tên biến thể')
    name: string;

    @EnumRequired(ProductVariantSize, 'Size biến thể')
    size: ProductVariantSize;

    @EnumRequired(ProductVariantType, 'Type biến thể')
    type: ProductVariantType;

    @NumberRequired('Giá tùy chỉnh biến thể', 1)
    modifiedPrice: number;

}

export class ProductIngredientDto {
    @NumberRequired('Id Ingredient', 1)
    ingredientId: number;

    @NumberRequired('Số lượng', 1)
    quantity: number

    @BooleanNotRequired
    isDefault?: boolean;
}

export class CreateProductDto {
    @StringRequired('Tên sản phẩm')
    name: string;

    @StringRequired('Ảnh sản phẩm')
    imageUrl: string;

    @StringNotRequired
    description?: string;
    
    @NumberRequired('Gía sản phẩm')
    basePrice: number;

    @NumberRequired('Id danh mục sản phẩm', 1)
    categoryId: number;

    @BooleanNotRequired
    isFeatured?: boolean;

    @ArrayNotRequired(ProductVariantDto)
    productVariants?: ProductVariantDto[]

    @ArrayNotRequired(ProductIngredientDto)
    productIngredients?: ProductIngredientDto[];
}

