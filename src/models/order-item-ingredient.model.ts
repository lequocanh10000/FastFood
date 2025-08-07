import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { OrderItem } from "./order-item.model";
import { Ingredient } from "./ingredient.model";

@Table 
export class OrderItemIngredient extends Model<OrderItemIngredient> {
    @ForeignKey(() => OrderItem)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    orderItemId: number;
    
    @ForeignKey(() => Ingredient)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    ingredientId: number;

    @Column({
        defaultValue: 1,
        type: DataType.INTEGER,
    })
    quantity: number;

    @BelongsTo(() => OrderItem)
    orderItem: OrderItem;

    @BelongsTo(() => Ingredient)
    ingredient: Ingredient;
}