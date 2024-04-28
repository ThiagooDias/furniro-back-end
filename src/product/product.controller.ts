import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


// @Serialize(ProductDto)
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  createProduct(@Body() body: CreateProductDto) {
    return this.productService.create(body);
  }

  @Get('/:id')
  getProduct(@Param('id') id: string) {
    return this.productService.findOne(parseInt(id));
  }

  @Get()
   getProductsList(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('name') name: string,
    @Query('category') category: string,
    @Query('isNew') isNew: string,
    @Query('maxPrice') maxPrice: string,
    @Query('sortBy') sortBy: string,
    @Query('sortDirection') sortDirection: string,
    @Query('withDiscount') withDiscount: string,
  ) {
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 16;
    const isNewBoolean = isNew ? isNew.toLowerCase() === 'true' : undefined;
    const whithDiscountBoolean = withDiscount
      ? withDiscount.toLowerCase() === 'true'
      : undefined;
    const maxPriceNumber = parseFloat(maxPrice);
    const queryFilters = {
      name,
      category: parseInt(category),
      isNew: isNewBoolean,
      withDiscount: whithDiscountBoolean,
      maxPrice: maxPriceNumber,
      sortBy,
      sortDirection,
    };
    
    return this.productService.find(pageNumber, limitNumber, queryFilters);
  }

  @Patch('/:id')
  updateProduct(@Param('id') id: string, @Body() body: UpdateProductDto) {
    return this.productService.update(parseInt(id), body);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: string) {
    console.log(parseInt(id));

    return this.productService.remove(parseInt(id));
  }
}
