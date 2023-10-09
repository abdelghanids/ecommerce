import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-Provider.dto';
import { UpdateProviderDto } from './dto/update-Provider.dto';
import { ProviderService } from './Provider.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('Provider')
@ApiTags('Categories')
export class ProviderController {
   constructor(private readonly ProviderService: ProviderService) { }
@Post()
   async createProvider(@Res() response, @Body() createProviderDto: CreateProviderDto) {
  try {
    const newProvider = await this.ProviderService.createProvider(createProviderDto);
    return response.status(HttpStatus.CREATED).json({
    message: 'Provider has been created successfully',
    newProvider,});
 } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode: 400,
    message: 'Error: Provider not created!',
    error: 'Bad Request'
 });
 }
}
@Put('/:id')
async updateProvider(@Res() response,@Param('id') ProviderId: string,
@Body() updateProviderDto: UpdateProviderDto) {
  try {
   const existingProvider = await this.ProviderService.updateProvider(ProviderId, updateProviderDto);
  return response.status(HttpStatus.OK).json({
  message: 'Provider has been successfully updated',
  existingProvider,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
@Get()
async getProviders(@Res() response) {
try {
  const ProviderData = await this.ProviderService.getAllProviders();
  return response.status(HttpStatus.OK).json({
  message: 'All Providers data found successfully',ProviderData,});
 } catch (err) {
  return response.status(err.status).json(err.response);
 }
}
@Get('/:id')
async getProvider(@Res() response, @Param('id') ProviderId: string) {
 try {
    const existingProvider = await
this.ProviderService.getProvider(ProviderId);
    return response.status(HttpStatus.OK).json({
    message: 'Provider found successfully',existingProvider,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
@Delete('/:id')
async deleteProvider(@Res() response, @Param('id') ProviderId: string)
{
  try {
    const deletedProvider = await this.ProviderService.deleteProvider(ProviderId);
    return response.status(HttpStatus.OK).json({
    message: 'Provider deleted successfully',
    deletedProvider,});
  }catch (err) {
    return response.status(err.status).json(err.response);
  }
 }
}