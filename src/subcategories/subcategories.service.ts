import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from "mongoose";
import { ISubCategory } from './Interface/SubCategory.interface';
import { CreateSubCategoryDto } from './dto/create-SubCategory.dto';
import { UpdateSubcategoryDto } from './dto/update-SubCategory.dto';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectModel('SubCategory') private SubCategoryModel: Model<ISubCategory>,
    @InjectModel('Category') private CategoryModel: Model<any>,
  ) {}


async createSubCategory(createSubCategoryDto: CreateSubCategoryDto): Promise<ISubCategory> {
   const newSubCategory = await new this.SubCategoryModel(createSubCategoryDto);
   await this.CategoryModel.updateOne({_id:createSubCategoryDto.category},
    {$push :{subcategories:newSubCategory._id}})
   return newSubCategory.save();
}
async updateSubCategory(SubCategoryId: string, updateSubCategoryDto: UpdateSubcategoryDto): Promise<ISubCategory> {
    const existingSubCategory = await        this.SubCategoryModel.findByIdAndUpdate(SubCategoryId, updateSubCategoryDto, { new: true });
   if (!existingSubCategory) {
     throw new NotFoundException(`SubCategory #${SubCategoryId} not found`);
   }
   return existingSubCategory;
}
async getAllSubCategorys(): Promise<ISubCategory[]> {
    const SubCategoryData = await this.SubCategoryModel.find();
    if (!SubCategoryData || SubCategoryData.length == 0) {
        throw new NotFoundException('SubCategorys data not found!');
    }
    return SubCategoryData;
}
async getSubCategory(SubCategoryId: string): Promise<ISubCategory> {
   const existingSubCategory = await     this.SubCategoryModel.findById(SubCategoryId).exec();
   if (!existingSubCategory) {
    throw new NotFoundException(`SubCategory #${SubCategoryId} not found`);
   }
   return existingSubCategory;
}
async deleteSubCategory(SubCategoryId: string): Promise<ISubCategory> {
    const deletedSubCategory = await this.SubCategoryModel.findByIdAndDelete(SubCategoryId);
   if (!deletedSubCategory) {
     throw new NotFoundException(`SubCategory #${SubCategoryId} not found`);
   }
   return deletedSubCategory;
}
}