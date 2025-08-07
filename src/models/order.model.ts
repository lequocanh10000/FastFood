import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { User } from "./user.model";
import { Address } from "./address.model";
import { OrderItem } from "./order-item.model";
import { Product } from "./product.model";
import { ProductVariant } from "./product-variant";
import { Review } from "./review.model";

export enum OrderStatus {
    PENDING = 'Đang chờ',
    CONFIRMED = 'Đã xác nhận',
    CANCELLED = 'Đã hủy',
    PREPEARING = 'Đang chuẩn bị',
    READY = 'Sẵn sàng',
    DELIVERED = 'Đã giao hàng'
}

export enum PaymentMethod {
    CASH = 'Thanh toán khi nhận hàng',
    ONLINE = 'Thanh toán online'
}

export enum PaymentStatus {
    PAID = 'Đã thanh toán',
    FAILED = 'Thanh toán thất bại',
    PENDING = 'Đang chờ thanh toán',
    REFUNDED = 'Hoàn tiền'
}

@Table 
export class Order extends Model<Order> {
    @Column({
        allowNull: false,
        unique: true,
        type: DataType.STRING,
    })
    orderNumber: string;
    
    @Column({
        allowNull: false,
        type: DataType.ENUM(...Object.values(OrderStatus))
    })
    orderStatus: OrderStatus;

    @Column({
        allowNull: false,
        type: DataType.ENUM(...Object.values(PaymentMethod))
    })
    paymentMethod: PaymentMethod;

    @Column({
        allowNull: false,
        type: DataType.ENUM(...Object.values(PaymentStatus))
    })
    paymentStatus: PaymentStatus;

    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    subTotal: number;

    @Column({
        defaultValue: 0,
        type: DataType.INTEGER,
    })
    deliveryFee: number;

    @Column({
        defaultValue: 0,
        type: DataType.INTEGER,
    })
    discount: number;

    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    total: number;

    @Column({
        allowNull: true,
        type: DataType.TEXT,
    })
    notes: string;

    @ForeignKey(() => User)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    userId: number;

    @ForeignKey(() => Address)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    addressId: number;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Address)
    address: Address;

    // Relationship
    @HasMany(() => OrderItem) 
    orderItems: OrderItem[];

    @HasMany(() => Review)
    reviews: Review[];
}