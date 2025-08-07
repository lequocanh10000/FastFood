import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { User } from "./user.model";
import { Order } from "./order.model";

@Table 
export class Address extends Model<Address> {
    @Column({
        allowNull: true,
        type: DataType.STRING,
    })
    street: string;
    
    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    city: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    district: string;

    @Column({
        allowNull: true,
        type: DataType.STRING,
    })
    ward: string;

    @Column({
        allowNull: false,
        type: DataType.FLOAT,
    })
    longitude: number;

    @Column({
        allowNull: false,
        type: DataType.FLOAT,
    })
    latitude: number;

    @Column({
        defaultValue: true,
        type: DataType.BOOLEAN,
    })
    isDefault: boolean;

    @ForeignKey(() => User)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    userId: number;

    @BelongsTo (() => User)
    user: User;

    // Relationship
    @HasMany(() => Order)
    orders: Order[];
}