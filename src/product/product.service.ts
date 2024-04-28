import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

interface QueryFilters {
  name?: string;
  category?: number;
  isNew?: boolean;
  maxPrice?: number;
  sortBy?: string;
  sortDirection?: string;
  withDiscount?: boolean;
}

function truncateToTwoDecimalPlaces(value: number): number {
  return Math.floor(value * 100) / 100;
}

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  create(productDto: CreateProductDto) {
    const product = this.repo.create(productDto);

    if (product.discountPercent) {
      product.currentPrice = (product.price * product.discountPercent) / 100;

      product.currentPrice = truncateToTwoDecimalPlaces(product.currentPrice);
    } else {
      product.currentPrice = product.price
    }

    return this.repo.save(product);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id });
  }

  async find(page: number, limit: number, queryFilters: QueryFilters) {
    const {
      name,
      category,
      isNew,
      maxPrice,
      sortBy,
      sortDirection,
      withDiscount,
    } = queryFilters;
    const offset = (page - 1) * limit;

    let query = this.repo.createQueryBuilder('product');

    if (name) {
      query = query.andWhere('LOWER(product.name) LIKE LOWER(:name)', {
        name: `%${name}%`,
      });
    }

    if (category) {
      query = query.andWhere('product.categoryId = :category', { category });
    }

    if (isNew !== undefined) {
      query = query.andWhere('product.isNew = :isNew', { isNew });
    }

    if (withDiscount) {
      query = query.andWhere('product.discountPercent IS NOT NULL');
    }

    if (maxPrice !== undefined) {
      query = query.andWhere('product.price <= :maxPrice', { maxPrice });
    }

    if (sortBy && sortDirection) {
      if (['name', 'price'].includes(sortBy.toLowerCase())) {
        const direction =
          sortDirection.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
        query = query.orderBy(`product.${sortBy}`, direction);
      }
    }

    query = query.skip(offset).take(limit);

    const [products, total] = await query.getManyAndCount();

    const endIndex = page * limit;
    const startIndex = endIndex - limit + 1;

    return { results: total, startIndex, endIndex, products };
  }

  async update(id: number, attrs: Partial<Product>) {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException('product not found!');
    }

    Object.assign(product, attrs);
    return this.repo.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException('Product not found!');
    }

    return this.repo.remove(product);
  }
}
