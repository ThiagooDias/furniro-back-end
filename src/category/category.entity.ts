import { Product } from 'src/product/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.categoryId)
  @Column('text', { array: true })
  products: Product[];

  @Column({type: 'text'})
  imageLink: string;

  @Column()
  createdDate: Date;

  @Column()
  updatedDate: Date;
}
