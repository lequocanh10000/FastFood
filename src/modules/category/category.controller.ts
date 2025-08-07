import { Body, Controller, Get, Param, ParseIntPipe, Post, Patch, Delete, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';

@ApiTags('Danh mục')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiResponse({
    status: 201,
    description: 'Danh mục tạo thành công',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Danh mục đã tồn tại',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Slug bị trùng',
  })
  @ApiOperation({
    summary: 'Tạo mới danh mục(Admin only)',
  })

  @ApiBearerAuth()
  @Post('create')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  @UseGuards(JwtGuard)
  @Get('all')
  async getAllCategories(@Req() req: any) {
    console.log(req.user);
    return await this.categoryService.findAll();
  }

  @Patch('update/:id')
  async update(@Body()updateCategoryDto: UpdateCategoryDto, @Param('id', ParseIntPipe) id: number) {
    return this.categoryService.update(updateCategoryDto, id)
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.delete(id);
  }
}
