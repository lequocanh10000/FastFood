import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { CartItem } from "./cart-item.model";
import { Ingredient } from "./ingredient.model";

@Table 
export class CartItemIngredient extends Model<CartItemIngredient> {
    @Column({
        defaultValue: 1,
        type: DataType.INTEGER,
    })
    quantity: number;

    @ForeignKey(() => CartItem)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    cartItemId: number;

    @ForeignKey(() => Ingredient)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    ingredientId: number;

    @BelongsTo(() => CartItem)
    cartItem: CartItem;

    @BelongsTo(() => Ingredient)
    ingredient: Ingredient;

}