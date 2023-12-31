import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('Category')
@ApiTags('Categories')
export class CategoryController {
   constructor(private readonly CategoryService: CategoryService) { }
@Post()
   async createCategory(@Res() response, @Body() createCategoryDto: CreateCategoryDto) {
  try {
    const newCategory = await this.CategoryService.createCategory(createCategoryDto);
    return response.status(HttpStatus.CREATED).json({
    message: 'Category has been created successfully',
    newCategory,});
 } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode: 400,
    message: 'Error: Category not created!',
    error: 'Bad Request'
 });
 }
}
@Put('/:id')
async updateCategory(@Res() response,@Param('id') CategoryId: string,
@Body() updateCategoryDto: UpdateCategoryDto) {
  try {
   const existingCategory = await this.CategoryService.updateCategory(CategoryId, updateCategoryDto);
  return response.status(HttpStatus.OK).json({
  message: 'Category has been successfully updated',
  existingCategory,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
@Get()
async getCategorys(@Res() response) {
try {
  const CategoryData = await this.CategoryService.getAllCategorys();
  return response.status(HttpStatus.OK).json({
  message: 'All Categorys data found successfully',CategoryData,});
 } catch (err) {
  return response.status(err.status).json(err.response);
 }
}
@Get('/:id')
async getCategory(@Res() response, @Param('id') CategoryId: string) {
 try {
    const existingCategory = await
this.CategoryService.getCategory(CategoryId);
    return response.status(HttpStatus.OK).json({
    message: 'Category found successfully',existingCategory,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
@Delete('/:id')
async deleteCategory(@Res() response, @Param('id') CategoryId: string)
{
  try {
    const deletedCategory = await this.CategoryService.deleteCategory(CategoryId);
    return response.status(HttpStatus.OK).json({
    message: 'Category deleted successfully',
    deletedCategory,});
  }catch (err) {
    return response.status(err.status).json(err.response);
  }
 }
}