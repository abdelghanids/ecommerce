import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { SubCategorySchema } from './entities/subcategory.entity';
import { SubCategoryController } from './subcategories.controller';
import { SubCategoryService } from './subcategories.service';
import { CategorySchema } from 'src/categories/entities/category.entity';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'SubCategory', schema: SubCategorySchema }]),
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }])
  ],
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
})
export class SubCategoriesModule {}
