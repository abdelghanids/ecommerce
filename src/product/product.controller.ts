import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CreateProductDto } from './dto/create-Product.dto';
import { UpdateProductDto } from './dto/update-Product.dto';
import { ProductService } from './product.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import {diskStorage} from 'multer';

@Controller('Product')
@ApiTags('Products')
export class ProductController {
   constructor(private readonly ProductService: ProductService) { }
@Post()

@ApiConsumes("multipart/form-data")
  @ApiBody({
    schema:{
      type:'object',
      properties:{
        ref:{type:'string'},
        price:{type:"number"},
        description:{type:'string'},
        qte:{type:'number'},
        files:{
          type:'array',
          items:{
            type:'string',
            format:'binary'
          }
        }
      }
    }
  })
  
@UseInterceptors(
  FilesInterceptor("files" , 3,{
    storage:diskStorage({
      destination:"./upload",
      filename:(_request,file, callback)=>
      callback(null, `${new Date().getTime()}-${file.originalname}`)
    })
  })
)

   async createProduct(@Res() response, @Body() createProductDto: CreateProductDto,@UploadedFiles() files) {
  try {
    createProductDto.galleries=files.map(item=>item.filename)
    const newProduct = await this.ProductService.createProduct(createProductDto);
    return response.status(HttpStatus.CREATED).json({
    message: 'Product has been created successfully',
    newProduct,});
 } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode: 400,
    message: 'Error: Product not created!',
    error: 'Bad Request'
 });
 }
}
@Put('/:id')
async updateProduct(@Res() response,@Param('id') ProductId: string,
@Body() updateProductDto: UpdateProductDto) {
  try {
   const existingProduct = await this.ProductService.updateProduct(ProductId, updateProductDto);
  return response.status(HttpStatus.OK).json({
  message: 'Product has been successfully updated',
  existingProduct,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
@Get("getAll")
async getProducts(@Res() response) {
try {
  const ProductData = await this.ProductService.getAllProducts();
  return response.status(HttpStatus.OK).json({
  message: 'All Products data found successfully',ProductData,});
 } catch (err) {
  return response.status(err.status).json(err.response);
 }
}
@Get('/:id')
async getProduct(@Res() response, @Param('id') ProductId: string) {
 try {
    const existingProduct = await
this.ProductService.getProduct(ProductId);
    return response.status(HttpStatus.OK).json({
    message: 'Product found successfully',existingProduct,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
@Delete('/:id')
async deleteProduct(@Res() response, @Param('id') ProductId: string)
{
  try {
    const deletedProduct = await this.ProductService.deleteProduct(ProductId);
    return response.status(HttpStatus.OK).json({
    message: 'Product deleted successfully',
    deletedProduct,});
  }catch (err) {
    return response.status(err.status).json(err.response);
  }
 }
}


