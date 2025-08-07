import { Table, Model, Column, DataType, HasMany, HasOne, BeforeValidate } from "sequelize-typescript";
import { Address } from "./address.model";
import { Order } from "./order.model";
import { Cart } from "./cart.model";
import { UserCoupon } from "./user-coupon.model";
import { Review } from "./review.model";
import * as bcrypt from 'bcryptjs'


export enum UserRoles {
    ADMIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER',
}

@Table
export class User extends Model<User> {
    @Column({
        allowNull: false,
        unique: true,
        type: DataType.STRING,
    })
    email: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    password: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    name: string;

    @Column({
        allowNull: true,
        type: DataType.STRING,
    })
    avatar: string;

    @Column({
        allowNull: true,
        type: DataType.STRING,
    })
    phone: string;

    @Column({
        allowNull: true,
        type: DataType.ENUM(...Object.values(UserRoles)),
        defaultValue: UserRoles.CUSTOMER
    })
    role: UserRoles;

    @Column({
        allowNull: true,
        type: DataType.STRING,
    })
    provider: string;

    // Relationship
    @HasMany(() => Address)
    addresses: Address[];

    @HasMany(() => Order)
    orders: Order[];
    
    @HasOne(() => Cart)
    cart: Cart;

    @HasMany(() => UserCoupon)
    coupons: UserCoupon[];

    @HasMany(() => Review)
    reviews: Review[];

    // Methods
    comparePassword(password: string) {
        const {password: passwordInDb} = this.get( {plain: true})
        return bcrypt.compare(password, passwordInDb)
    }

    getUserWithoutPassword() {
        const {password: _, ...rest } = this.get( {plain: true});
        return rest
    }

    @BeforeValidate
    static hashPassword(user: User) {
        if(user.isNewRecord) {
            const password = user.get('password');
            const hashedPassword = bcrypt.hashSync(password, 10);

            user.setDataValue('password', hashedPassword);
        }
    }
}