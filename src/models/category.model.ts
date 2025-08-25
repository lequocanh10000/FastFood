import { Model, Table, Column, DataType, HasMany, BeforeValidate, BeforeUpdate } from "sequelize-typescript";
import { Product } from "./product.model";
import Helper from "src/utils/helper";

@Table 
export class Category extends Model<Category> {
    @Column({
        allowNull: false,
        unique: true,
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
        type: DataType.INTEGER,
        defaultValue: 0,
    })
    sortOrder: number;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true,
    })
    isActive: boolean;

    // Relationship
    @HasMany(() => Product)
    products: Product

    // Method
    @BeforeValidate
    static makeSlug(newCategory: Category) {
        const name = newCategory.dataValues.name;
        if (name && newCategory.isNewRecord) {
            const slug = Helper.makeSlugFromString(name);
            newCategory.setDataValue('slug', slug);
        }
    }

    @BeforeUpdate
    static updateSlug(category: Category) {
        if(category.changed('name')) {
            const name = category.dataValues.name;
            const slug = Helper.makeSlugFromString(name);
            category.setDataValue('slug', slug);
        }
    }
}