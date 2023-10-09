import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from "mongoose";
import { IOrder } from './Interface/Order.interface';
import { CreateOrderDto } from './dto/create-Order.dto';
import { UpdateOrderDto } from './dto/update-Order.dto';

@Injectable()
export class OrderService {
constructor(@InjectModel('Order') private OrderModel:Model<IOrder>) { }


async createOrder(createOrderDto: CreateOrderDto): Promise<IOrder> {
   const newOrder = await new this.OrderModel(createOrderDto);
   return newOrder.save();
}
async updateOrder(OrderId: string, updateOrderDto: UpdateOrderDto): Promise<IOrder> {
    const existingOrder = await        this.OrderModel.findByIdAndUpdate(OrderId, updateOrderDto, { new: true });
   if (!existingOrder) {
     throw new NotFoundException(`Order #${OrderId} not found`);
   }
   return existingOrder;
}
async getAllOrders(): Promise<IOrder[]> {
    const OrderData = await this.OrderModel.find();
    if (!OrderData || OrderData.length == 0) {
        throw new NotFoundException('Orders data not found!');
    }
    return OrderData;
}
async getOrder(OrderId: string): Promise<IOrder> {
   const existingOrder = await     this.OrderModel.findById(OrderId).exec();
   if (!existingOrder) {
    throw new NotFoundException(`Order #${OrderId} not found`);
   }
   return existingOrder;
}
async deleteOrder(OrderId: string): Promise<IOrder> {
    const deletedOrder = await this.OrderModel.findByIdAndDelete(OrderId);
   if (!deletedOrder) {
     throw new NotFoundException(`Order #${OrderId} not found`);
   }
   return deletedOrder;
}
}