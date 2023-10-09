import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-Order.dto';
import { UpdateOrderDto } from './dto/update-Order.dto';
import { OrderService } from './Order.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('Order')
@ApiTags('Order')
export class OrderController {
   constructor(private readonly OrderService: OrderService) { }
@Post()
   async createOrder(@Res() response, @Body() createOrderDto: CreateOrderDto) {
  try {
    const newOrder = await this.OrderService.createOrder(createOrderDto);
    return response.status(HttpStatus.CREATED).json({
    message: 'Order has been created successfully',
    newOrder,});
 } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode: 400,
    message: 'Error: Order not created!',
    error: 'Bad Request'
 });
 }
}
@Put('/:id')
async updateOrder(@Res() response,@Param('id') OrderId: string,
@Body() updateOrderDto: UpdateOrderDto) {
  try {
   const existingOrder = await this.OrderService.updateOrder(OrderId, updateOrderDto);
  return response.status(HttpStatus.OK).json({
  message: 'Order has been successfully updated',
  existingOrder,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
@Get()
async getOrders(@Res() response) {
try {
  const OrderData = await this.OrderService.getAllOrders();
  return response.status(HttpStatus.OK).json({
  message: 'All Orders data found successfully',OrderData,});
 } catch (err) {
  return response.status(err.status).json(err.response);
 }
}
@Get('/:id')
async getOrder(@Res() response, @Param('id') OrderId: string) {
 try {
    const existingOrder = await
this.OrderService.getOrder(OrderId);
    return response.status(HttpStatus.OK).json({
    message: 'Order found successfully',existingOrder,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
@Delete('/:id')
async deleteOrder(@Res() response, @Param('id') OrderId: string)
{
  try {
    const deletedOrder = await this.OrderService.deleteOrder(OrderId);
    return response.status(HttpStatus.OK).json({
    message: 'Order deleted successfully',
    deletedOrder,});
  }catch (err) {
    return response.status(err.status).json(err.response);
  }
 }
}