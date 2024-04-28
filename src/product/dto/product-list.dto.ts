import { ProductDto } from "./product.dto";

export class ProductsListDto {
  total: number;
  products: ProductDto[]; 
}
