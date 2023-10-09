import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-Customer.dto';
import { UpdateCustomerDto } from './dto/update-Customer.dto';
import { CustomerService } from './Customer.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('Customer')
@ApiTags('Customer')
export class CustomerController {
   constructor(private readonly CustomerService: CustomerService) { }
@Post()
   async createCustomer(@Res() response, @Body() createCustomerDto: CreateCustomerDto) {
  try {
    const newCustomer = await this.CustomerService.createCustomer(createCustomerDto);
    return response.status(HttpStatus.CREATED).json({
    message: 'Customer has been created successfully',
    newCustomer,});
 } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode: 400,
    message: 'Error: Customer not created!',
    error: 'Bad Request'
 });
 }
}
@Put('/:id')
async updateCustomer(@Res() response,@Param('id') CustomerId: string,
@Body() updateCustomerDto: UpdateCustomerDto) {
  try {
   const existingCustomer = await this.CustomerService.updateCustomer(CustomerId, updateCustomerDto);
  return response.status(HttpStatus.OK).json({
  message: 'Customer has been successfully updated',
  existingCustomer,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
@Get()
async getCustomers(@Res() response) {
try {
  const CustomerData = await this.CustomerService.getAllCustomers();
  return response.status(HttpStatus.OK).json({
  message: 'All Customers data found successfully',CustomerData,});
 } catch (err) {
  return response.status(err.status).json(err.response);
 }
}
@Get('/:id')
async getCustomer(@Res() response, @Param('id') CustomerId: string) {
 try {
    const existingCustomer = await
this.CustomerService.getCustomer(CustomerId);
    return response.status(HttpStatus.OK).json({
    message: 'Customer found successfully',existingCustomer,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
@Delete('/:id')
async deleteCustomer(@Res() response, @Param('id') CustomerId: string)
{
  try {
    const deletedCustomer = await this.CustomerService.deleteCustomer(CustomerId);
    return response.status(HttpStatus.OK).json({
    message: 'Customer deleted successfully',
    deletedCustomer,});
  }catch (err) {
    return response.status(err.status).json(err.response);
  }
 }
}