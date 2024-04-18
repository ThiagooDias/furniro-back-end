import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  createCategory(@Body() body: CreateCategoryDto){
    return this.categoryService.create(body)
  }

  @Get('/:id')
  getCategory(@Param('id') id: string){
    return this.categoryService.findOne(parseInt(id))
  }

  @Get()
  getAllCategory(){
    return this.categoryService.findAll()
  }

  @Patch('/:id')
  updateCategory(@Param('id') id: string, @Body() body: UpdateCategoryDto){
    return this.categoryService.update(parseInt(id), body)
  }

  @Delete('/:id')
  deleteCategory(@Param('id') id: string){
    return this.categoryService.remove(parseInt(id))
  }
}
