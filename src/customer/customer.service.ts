import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from "mongoose";
import { ICustomer } from './Interface/Customer.interface';
import { CreateCustomerDto } from './dto/create-Customer.dto';
import { UpdateCustomerDto } from './dto/update-Customer.dto';

@Injectable()
export class CustomerService {
constructor(@InjectModel('customers') private CustomerModel:Model<ICustomer>) { }


async createCustomer(createCustomerDto: CreateCustomerDto): Promise<ICustomer> {
   const newCustomer = await new this.CustomerModel(createCustomerDto);
   return newCustomer.save();
}
async updateCustomer(CustomerId: string, updateCustomerDto: UpdateCustomerDto): Promise<ICustomer> {
    const existingCustomer = await        this.CustomerModel.findByIdAndUpdate(CustomerId, updateCustomerDto, { new: true });
   if (!existingCustomer) {
     throw new NotFoundException(`Customer #${CustomerId} not found`);
   }
   return existingCustomer;
}
async getAllCustomers(): Promise<ICustomer[]> {
    const CustomerData = await this.CustomerModel.find();
    if (!CustomerData || CustomerData.length == 0) {
        throw new NotFoundException('Customers data not found!');
    }
    return CustomerData;
}
async getCustomer(CustomerId: string): Promise<ICustomer> {
   const existingCustomer = await     this.CustomerModel.findById(CustomerId).exec();
   if (!existingCustomer) {
    throw new NotFoundException(`Customer #${CustomerId} not found`);
   }
   return existingCustomer;
}
async deleteCustomer(CustomerId: string): Promise<ICustomer> {
    const deletedCustomer = await this.CustomerModel.findByIdAndDelete(CustomerId);
   if (!deletedCustomer) {
     throw new NotFoundException(`Customer #${CustomerId} not found`);
   }
   return deletedCustomer;
}
}