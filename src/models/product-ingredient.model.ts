import { Table, Model, Column, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Product } from "./product.model";
import { Ingredient } from "./ingredient.model";


@Table
export class ProductIngredient extends Model<ProductIngredient> {
    @ForeignKey(() => Product)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    productId: number;

    @ForeignKey(() => Ingredient)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    ingredientId: number;

    @Column({
        defaultValue: false,
        type: DataType.BOOLEAN,
    })
    isDefault: boolean;

    @Column({
        defaultValue: 1,
        type: DataType.INTEGER,
    })
    quantity: number;

    @BelongsTo(() => Product)
    product: Product

    @BelongsTo(() => Ingredient)
    ingredient: Ingredient
}