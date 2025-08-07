import { Table, Model, Column, DataType, BelongsTo, ForeignKey, HasMany } from "sequelize-typescript";
import { Category } from "./category.model";
import { OrderItemIngredient} from "./order-item-ingredient.model";
import { CartItemIngredient } from "./cart-item-ingredient.model";

@Table
export class Ingredient extends Model<Ingredient> {
    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    name: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    imageUrl: string;
    
    @Column({
        allowNull: true,
        type: DataType.TEXT,
    })
    description: string;

    @Column({
        defaultValue: 0,
        type: DataType.INTEGER,
    })
    price: number;

    @Column({
        defaultValue: true,
        type: DataType.BOOLEAN,
    })
    isActive: boolean;

    @Column({
        defaultValue: false,
        type: DataType.BOOLEAN,
    })
    isRequired: string;
    
    @ForeignKey(() => Category)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    categoryId: number;
    @BelongsTo(() => Category)
    category: Category;

    // Relationship
    @HasMany(() => OrderItemIngredient)
    orderIngredients: OrderItemIngredient[];

    @HasMany(() => CartItemIngredient)
    cartIngredients: CartItemIngredient[];
}