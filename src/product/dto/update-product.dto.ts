import { Expose } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsNumber,
  IsString,
} from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  sku: string;

  @IsOptional()
  @IsNumber()
  categoryId: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  largeDescription: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  discountPercent: number;

  @IsOptional()
  @IsBoolean()
  isNew: boolean;

  @IsOptional()
  @IsString()
  imageLink: string;

  @IsOptional()
  @IsArray()
  otherImagesLink: string[];
}