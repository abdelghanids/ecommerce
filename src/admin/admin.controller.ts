import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-Admin.dto';
import { UpdateAdminDto } from './dto/update-Admin.dto';
import { AdminService } from './admin.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('Admin')
@ApiTags('Admins')
export class AdminController {
   constructor(private readonly AdminService: AdminService) { }
@Post()
   async createAdmin(@Res() response, @Body() createAdminDto: CreateAdminDto) {
  try {
    const newAdmin = await this.AdminService.createAdmin(createAdminDto);
    return response.status(HttpStatus.CREATED).json({
    message: 'Admin has been created successfully',
    newAdmin,});
 } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode: 400,
    message: 'Error: Admin not created!',
    error: 'Bad Request'
 });
 }
}
@Put('/:id')
async updateAdmin(@Res() response,@Param('id') AdminId: string,
@Body() updateAdminDto: UpdateAdminDto) {
  try {
   const existingAdmin = await this.AdminService.updateAdmin(AdminId, updateAdminDto);
  return response.status(HttpStatus.OK).json({
  message: 'Admin has been successfully updated',
  existingAdmin,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
@Get()
async getAdmins(@Res() response) {
try {
  const AdminData = await this.AdminService.getAllAdmins();
  return response.status(HttpStatus.OK).json({
  message: 'All Admins data found successfully',AdminData,});
 } catch (err) {
  return response.status(err.status).json(err.response);
 }
}
@Get('/:id')
async getAdmin(@Res() response, @Param('id') AdminId: string) {
 try {
    const existingAdmin = await
this.AdminService.getAdmin(AdminId);
    return response.status(HttpStatus.OK).json({
    message: 'Admin found successfully',existingAdmin,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
@Delete('/:id')
async deleteAdmin(@Res() response, @Param('id') AdminId: string)
{
  try {
    const deletedAdmin = await this.AdminService.deleteAdmin(AdminId);
    return response.status(HttpStatus.OK).json({
    message: 'Admin deleted successfully',
    deletedAdmin,});
  }catch (err) {
    return response.status(err.status).json(err.response);
  }
 }
}