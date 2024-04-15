import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/product.entity';
import { Category } from './category/category.entity';

@Module({
  imports: [
    ProductModule,
    CategoryModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'kesavan.db.elephantsql.com',
      port: 5432,
      username: 'jhvgpwyc',
      password: 'Ta9iMG01oPjtqu-QVfR9-J9VY-9lcRij',
      database: 'jhvgpwyc',
      entities: [Product, Category],
      synchronize: true,
      logging: 'all',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
