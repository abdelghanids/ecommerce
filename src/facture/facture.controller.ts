import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateFactureDto } from './dto/create-Facture.dto';
import { UpdateFactureDto } from './dto/update-Facture.dto';
import { FactureService } from './Facture.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('Facture')
@ApiTags('Facture')
export class FactureController {
   constructor(private readonly FactureService: FactureService) { }
@Post()
   async createFacture(@Res() response, @Body() createFactureDto: CreateFactureDto) {
  try {
    const newFacture = await this.FactureService.createFacture(createFactureDto);
    return response.status(HttpStatus.CREATED).json({
    message: 'Facture has been created successfully',
    newFacture,});
 } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode: 400,
    message: 'Error: Facture not created!',
    error: 'Bad Request'
 });
 }
}
@Put('/:id')
async updateFacture(@Res() response,@Param('id') FactureId: string,
@Body() updateFactureDto: UpdateFactureDto) {
  try {
   const existingFacture = await this.FactureService.updateFacture(FactureId, updateFactureDto);
  return response.status(HttpStatus.OK).json({
  message: 'Facture has been successfully updated',
  existingFacture,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
@Get()
async getFactures(@Res() response) {
try {
  const FactureData = await this.FactureService.getAllFactures();
  return response.status(HttpStatus.OK).json({
  message: 'All Factures data found successfully',FactureData,});
 } catch (err) {
  return response.status(err.status).json(err.response);
 }
}
@Get('/:id')
async getFacture(@Res() response, @Param('id') FactureId: string) {
 try {
    const existingFacture = await
this.FactureService.getFacture(FactureId);
    return response.status(HttpStatus.OK).json({
    message: 'Facture found successfully',existingFacture,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
@Delete('/:id')
async deleteFacture(@Res() response, @Param('id') FactureId: string)
{
  try {
    const deletedFacture = await this.FactureService.deleteFacture(FactureId);
    return response.status(HttpStatus.OK).json({
    message: 'Facture deleted successfully',
    deletedFacture,});
  }catch (err) {
    return response.status(err.status).json(err.response);
  }
 }
}