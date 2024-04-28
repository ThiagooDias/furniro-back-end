import { Expose, Transform } from 'class-transformer';
export class ProductDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  sku: string;

  @Expose()
  categoryId: number;

  @Expose()
  description: string;

  @Expose()
  largeDescription: string;

  @Expose()
  @Transform(({ value }) => parseFloat(value))
  price: number;

  @Expose()
  @Transform(({ value }) => parseFloat(value))
  currentPrice: number;

  @Expose()
  discountPercent: number;

  @Expose()
  isNew: boolean;

  @Expose()
  imageLink: string;

  @Expose()
  otherImagesLink: string[];

  @Expose()
  createdDate: Date;

  @Expose()
  updatedDate: Date;
}
