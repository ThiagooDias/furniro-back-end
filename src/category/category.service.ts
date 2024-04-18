import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>){}

  create(categoryDto: CreateCategoryDto){
    const category = this.repo.create(categoryDto)

    return this.repo.save(category)
  }

  findOne(id: number){
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id });
  }

  findAll(){
    return this.repo.find()
  }

  async update(id: number, attrs: Partial<Category>) {
    const category = await this.findOne(id);
    
    if (!category) {
      throw new NotFoundException('Category not found!');
    }

    Object.assign(category, attrs);
    return this.repo.save(category);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    
    if (!category) {
      throw new NotFoundException('Category not found!');
    }

    return this.repo.remove(category);
  }
}
