import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateCommandeDto } from './dto/create-Commande.dto';
import { UpdateCommandeDto } from './dto/update-Commande.dto';
import { CommandeService } from './commande.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('Commande')
@ApiTags('Commande')
export class CommandeController {
   constructor(private readonly CommandeService: CommandeService) { }
@Post()
   async createCommande(@Res() response, @Body() createCommandeDto: CreateCommandeDto) {
  try {
    const newCommande = await this.CommandeService.createCommande(createCommandeDto);
    return response.status(HttpStatus.CREATED).json({
    message: 'Commande has been created successfully',
    newCommande,});
 } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode: 400,
    message: 'Error: Commande not created!',
    error: 'Bad Request'
 });
 }
}
@Put('/:id')
async updateCommande(@Res() response,@Param('id') CommandeId: string,
@Body() updateCommandeDto: UpdateCommandeDto) {
  try {
   const existingCommande = await this.CommandeService.updateCommande(CommandeId, updateCommandeDto);
  return response.status(HttpStatus.OK).json({
  message: 'Commande has been successfully updated',
  existingCommande,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
@Get()
async getCommandes(@Res() response) {
try {
  const CommandeData = await this.CommandeService.getAllCommandes();
  return response.status(HttpStatus.OK).json({
  message: 'All Commandes data found successfully',CommandeData,});
 } catch (err) {
  return response.status(err.status).json(err.response);
 }
}
@Get('/:id')
async getCommande(@Res() response, @Param('id') CommandeId: string) {
 try {
    const existingCommande = await
this.CommandeService.getCommande(CommandeId);
    return response.status(HttpStatus.OK).json({
    message: 'Commande found successfully',existingCommande,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
@Delete('/:id')
async deleteCommande(@Res() response, @Param('id') CommandeId: string)
{
  try {
    const deletedCommande = await this.CommandeService.deleteCommande(CommandeId);
    return response.status(HttpStatus.OK).json({
    message: 'Commande deleted successfully',
    deletedCommande,});
  }catch (err) {
    return response.status(err.status).json(err.response);
  }
 }
}