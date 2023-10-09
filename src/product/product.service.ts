import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from "mongoose";

import { CreateProductDto } from './dto/create-Product.dto';
import { UpdateProductDto } from './dto/update-Product.dto';
import { IProduct } from './Interface/product.interface';

@Injectable()
export class ProductService {
constructor(@InjectModel('Product') private ProductModel:Model<IProduct>) { }


async createProduct(createProductDto: CreateProductDto): Promise<IProduct> {
   const newProduct = await new this.ProductModel(createProductDto);
   return newProduct.save();
}
async updateProduct(ProductId: string, updateProductDto: UpdateProductDto): Promise<IProduct> {
    const existingProduct = await        this.ProductModel.findByIdAndUpdate(ProductId, updateProductDto, { new: true });
   if (!existingProduct) {
     throw new NotFoundException(`Product #${ProductId} not found`);
   }
   return existingProduct;
}
async getAllProducts(): Promise<IProduct[]> {
    const ProductData = await this.ProductModel.find();
    if (!ProductData || ProductData.length == 0) {
        throw new NotFoundException('Products data not found!');
    }
    return ProductData;
}
async getProduct(ProductId: string): Promise<IProduct> {
   const existingProduct = await     this.ProductModel.findById(ProductId).exec();
   if (!existingProduct) {
    throw new NotFoundException(`Product #${ProductId} not found`);
   }
   return existingProduct;
}
async deleteProduct(ProductId: string): Promise<IProduct> {
    const deletedProduct = await this.ProductModel.findByIdAndDelete(ProductId);
   if (!deletedProduct) {
     throw new NotFoundException(`Product #${ProductId} not found`);
   }
   return deletedProduct;
}
}