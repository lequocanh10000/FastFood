import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from './user.model';
import { Product } from './product.model';
import { Order } from './order.model';


@Table
export class Review extends Model<Review> {
    @Column({
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        },
        type: DataType.INTEGER,
    })
    rating: number;

    @Column({
        allowNull: true,
        type: DataType.TEXT,
    })
    comment: string;
    
    @ForeignKey(() => User)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    userId: number;

    @ForeignKey(() => Product)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    productId: number;

    @ForeignKey(() => Order)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    orderId: number;

    @BelongsTo(() => User)
    user: User

    @BelongsTo(() => Product)
    product: Product;

    @BelongsTo(() => Order)
    order: Order;
}