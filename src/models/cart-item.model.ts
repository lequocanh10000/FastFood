import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Cart } from "./cart.model";
import { Product } from "./product.model";
import { ProductVariant } from "./product-variant";
import { CartItemIngredient } from "./cart-item-ingredient.model";

@Table 
export class CartItem extends Model<CartItem> {
    @Column({
        defaultValue: 1,
        type: DataType.INTEGER,
    })
    quantity: number;

    @ForeignKey(() => Cart)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    cartId: number;

    @ForeignKey(() => Product)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    productId: number;

    @ForeignKey(() => ProductVariant)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    variantId: number;

    @BelongsTo(() => Cart)
    cart: Cart;

    @BelongsTo(() => Product)
    product: Product;

    @BelongsTo(() => ProductVariant)
    variant: ProductVariant;

    // Relationship
    @HasMany(() => CartItemIngredient)
    ingredients: CartItemIngredient[];
}