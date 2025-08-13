import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Todo: Thêm check role, admin
  @Post('create')
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Get('one/:id')
  async findOne(@Param('id') id: number) {
    return await this.productService.findOne(id);
  }

  @Get('all')
  async findAll(@Query() filterProductDto: FilterProductDto) {
    return await this.productService.findAll(filterProductDto);
  }

  @Delete('soft/:id')
  async removeSoft(@Param('id') id: number) {
    return await this.productService.removeSoft(id);
  }

  @Delete('hard/:id')
  async removeHard(@Param('id') id: number) {
    return await this.productService.removeHard(id);
  }
}
