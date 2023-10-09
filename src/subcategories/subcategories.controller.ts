import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-SubCategory.dto';
import { UpdateSubcategoryDto } from './dto/update-SubCategory.dto';
import { SubCategoryService } from './subcategories.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('SubCategory')
@ApiTags('SubCategories')
export class SubCategoryController {
   constructor(private readonly SubCategoryService: SubCategoryService) { }
@Post()
   async createSubCategory(@Res() response, @Body() createSubCategoryDto: CreateSubCategoryDto) {
  try {
    const newSubCategory = await this.SubCategoryService.createSubCategory(createSubCategoryDto);
    return response.status(HttpStatus.CREATED).json({
    message: 'SubCategory has been created successfully',
    newSubCategory,});
 } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode: 400,
    message: 'Error: SubCategory not created!',
    error: 'Bad Request'
 });
 }
}
@Put('/:id')
async updateSubCategory(@Res() response,@Param('id') SubCategoryId: string,
@Body() updateSubCategoryDto: UpdateSubcategoryDto) {
  try {
   const existingSubCategory = await this.SubCategoryService.updateSubCategory(SubCategoryId, updateSubCategoryDto);
  return response.status(HttpStatus.OK).json({
  message: 'SubCategory has been successfully updated',
  existingSubCategory,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
@Get()
async getSubCategorys(@Res() response) {
try {
  const SubCategoryData = await this.SubCategoryService.getAllSubCategorys();
  return response.status(HttpStatus.OK).json({
  message: 'All SubCategorys data found successfully',SubCategoryData,});
 } catch (err) {
  return response.status(err.status).json(err.response);
 }
}
@Get('/:id')
async getSubCategory(@Res() response, @Param('id') SubCategoryId: string) {
 try {
    const existingSubCategory = await
this.SubCategoryService.getSubCategory(SubCategoryId);
    return response.status(HttpStatus.OK).json({
    message: 'SubCategory found successfully',existingSubCategory,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
@Delete('/:id')
async deleteSubCategory(@Res() response, @Param('id') SubCategoryId: string)
{
  try {
    const deletedSubCategory = await this.SubCategoryService.deleteSubCategory(SubCategoryId);
    return response.status(HttpStatus.OK).json({
    message: 'SubCategory deleted successfully',
    deletedSubCategory,});
  }catch (err) {
    return response.status(err.status).json(err.response);
  }
 }
}