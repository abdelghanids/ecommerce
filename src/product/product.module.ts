import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './entities/Product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MulterModule } from '@nestjs/platform-express';
import { SubCategorySchema } from 'src/subcategories/entities/subcategory.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: 'SubCategory', schema: SubCategorySchema }]),
    MulterModule.register({
      dest:'./upload'
    })
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
