import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('product')
export class ProductController {
  constructor() {}

  @Get()
  getProduct(@Param() id: string) {

  }

  @Get()
  getProductsList(@Query() query: string) {

  }

  @Post()
  createProduct(@Body() body ) { //TODO: create DTO

  }

  @Patch()
  updateProduct(@Param() id: string){

  }

  @Delete() 
  deletProduct(@Param() id: string) {

  }
}
