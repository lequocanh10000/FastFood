import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from 'src/models';
import { CreateCategoryDto } from './dto/create-category.dto';
import Helper from 'src/utils/helper';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category) private readonly categoryModel: typeof Category // Lấy model của sequelize
    ) {}

    async create(createCategoryDto: CreateCategoryDto) {
        const alreadyExists = await this.categoryModel.findOne({
            where: {
                slug: Helper.makeSlugFromString(createCategoryDto.name)
            },
        })
        if(alreadyExists) {
            throw new BadRequestException('Danh mục món ăn đã tồn tại.')        
        }
        await this.categoryModel.create(createCategoryDto as any);
        return {
            message: 'Danh mục đã được tạo thành công'
        };
    }

    async findAll() {
        return await this.categoryModel.findAll({
            where: {
                isActive: true,
            },
            order: [['sortOrder', 'ASC']],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'isActive', 'description']
            }
        })
    } 

    async update(updateCategoryDto: UpdateCategoryDto, id: number) {
        const alreadyExists = await this.categoryModel.findByPk(id);
        if(!alreadyExists) {
            throw new BadRequestException('Không tìm thấy danh mục');
        }

        const updated = await alreadyExists.update(updateCategoryDto);

        return { 
            message: 'Danh mục được cập nhật',
            data: updated
        };
    }

    async delete(id: number) {
        await this.categoryModel.destroy({
            where: {
                id,
            },
            cascade: true, // Xóa các bản ghi liên quan
        })
        return {
            message: 'Danh mục đã được xóa'
        }
    }

    async findOne(id: number) {
        return await this.categoryModel.findByPk(id, {raw: true});
    }
}
