import { Category } from 'src/category/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  sku: string;

  @ManyToOne(() => Category, (category) => category.products)
  @Column()
  categoryId: number;

  @Column()
  description: string;

  @Column()
  largeDescription: string;

  @Column()
  price: number;

  @Column()
  discountPrice: number;

  @Column()
  discountPercent: number;

  @Column()
  isNew: boolean;

  @Column()
  imageLink: string;

  @Column()
  otherImagesLink: string;

  @Column()
  createdDate: Date;

  @Column()
  updatedDate: Date;
}
