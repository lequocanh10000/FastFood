import { Model, Table, Column, DataType, HasMany} from "sequelize-typescript";
import { UserCoupon } from "./user-coupon.model";

export enum CouponType {
    FIXED = 'fixed',
    PERCENTAGE = 'percentage'
}

@Table 
export class Coupon extends Model<Coupon> {
    @Column({
        allowNull: false,
        unique: true,
        type: DataType.STRING,
    })
    userId: string;
    
    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    name: string;

    @Column({
        allowNull: true,
        type: DataType.TEXT,
    })
    description: string;

    @Column({
        allowNull: false,
        type: DataType.ENUM(...Object.values(CouponType)),
    })
    type: CouponType;

    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    value: number;

    @Column({
        defaultValue: 0,
        type: DataType.INTEGER,
    })
    minOrderAmout: number;

    @Column({
        defaultValue: 1,
        type: DataType.INTEGER,
    })
    maxUse: number;

    @Column({
        defaultValue: 0,
        type: DataType.INTEGER,
    })
    currentUse: number;

    @Column({
        allowNull: false,
        type: DataType.DATE,
    })
    validFrom: Date;

    @Column({
        allowNull: false,
        type: DataType.DATE,
    })
    validTo: Date;

    @Column({
        defaultValue: false,
        type: DataType.BOOLEAN,
    })
    isActive: Date;

    // Relationship
    @HasMany(() => UserCoupon)
    coupons: UserCoupon[]
}