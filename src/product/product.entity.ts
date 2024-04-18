import { Category } from 'src/category/category.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

  @Column('decimal', { scale: 2})
  price: number;

  @Column('decimal', { scale: 2, nullable: true })
  discountPrice?: number

  @Column({ nullable: true })
  discountPercent?: number;

  @Column()
  isNew: boolean;

  @Column()
  imageLink: string;

  @Column('text', { array: true })
  otherImagesLink: string[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
