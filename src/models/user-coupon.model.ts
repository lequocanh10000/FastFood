import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { User } from "./user.model";
import { Coupon } from "./coupon.model";


@Table 
export class UserCoupon extends Model<UserCoupon> {
    @Column({
        defaultValue: false,
        type: DataType.BOOLEAN,
    })
    isUsed: boolean;
    
    @Column({
        allowNull: true,
        type: DataType.DATE
    })
    usedAt: Date;

    @ForeignKey(() => User)
    @Column({
        allowNull: false,
        type: DataType.INTEGER
    })
    userId: number;

    @ForeignKey(() => Coupon)
    @Column({
        allowNull: false,
        type: DataType.INTEGER
    })
    couponId: number;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Coupon)
    coupon: Coupon;
}