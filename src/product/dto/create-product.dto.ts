import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  sku: string;

  @IsNumber()
  categoryId: number;

  @IsString()
  description: string;

  @IsString()
  largeDescription: string;

  @IsNumber()
  price: number;

  @IsNumber()
  discountPercent: number;

  @IsBoolean()
  isNew: boolean;

  @IsString()
  imageLink: string;

  @IsArray()
  otherImagesLink: string[];
}
