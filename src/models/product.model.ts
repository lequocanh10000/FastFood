import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Category } from './category.model';
import { OrderItem } from './order-item.model';
import { CartItem } from './cart-item.model';
import { Review } from './review.model';

@Table
export class Product extends Model<Product> {
    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    name: string;

    @Column({
        allowNull: false,
        unique: true,
        type: DataType.STRING,
    })
    slug: string;

    @Column({
        allowNull: true,
        type: DataType.TEXT,
    })
    description: string;

    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    basePrice: number;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    imageUrl: string;

    @Column({
        defaultValue: true,
        type: DataType.BOOLEAN,
    })
    isActive: boolean;

    @Column({
        defaultValue: false,
        type: DataType.BOOLEAN,
    })
    isFeatured: boolean;

    @ForeignKey(() => Category)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    categoryId: number;

    @BelongsTo(() => Category)
    category: Category;

    // Relationship
    @HasMany(() => OrderItem) 
    orderItems: OrderItem[]

    @HasMany(() => CartItem)
    cartItems: CartItem[];

    @HasMany(() => Review)
    reviews: Review[];
}