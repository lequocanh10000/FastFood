import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { User } from "./user.model";
import { CartItem } from "./cart-item.model";

@Table 
export class Cart extends Model<Cart> {
    @ForeignKey(() => User)
    @Column({
        allowNull: true,
        type: DataType.INTEGER,
    })
    userId: number;
    
    @BelongsTo(() => User)
    user: User;

    // Relationship
    @HasMany(() => CartItem)
    cartItems: CartItem[];
}