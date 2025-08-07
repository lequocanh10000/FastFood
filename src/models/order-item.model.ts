import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Order } from "./order.model";
import { Product } from "./product.model";
import { ProductVariant } from "./product-variant";
import { OrderItemIngredient } from "./order-item-ingredient.model";


@Table 
export class OrderItem extends Model<OrderItem> {
    @ForeignKey(() => Order)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    orderId: number;
    
    @ForeignKey(() => Product)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    productId: number;

    @Column({
        defaultValue: 1,
        type: DataType.INTEGER,
    })
    quantity: number;

    @ForeignKey(() => ProductVariant)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    variantId: number;

    @BelongsTo(() => Order)
    order: Order;

    @BelongsTo(() => Product)
    product: Product;

    @BelongsTo(() => ProductVariant)
    variant: ProductVariant;

    // Relationship
    @HasMany(() => OrderItemIngredient)
    ingredients: OrderItemIngredient[];
}