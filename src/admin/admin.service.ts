import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from "mongoose";
import { IAdmin } from './Interface/Admin.interface';
import { CreateAdminDto } from './dto/create-Admin.dto';
import { UpdateAdminDto } from './dto/update-Admin.dto';

@Injectable()
export class AdminService {
constructor(@InjectModel('Admin') private AdminModel:Model<IAdmin>) { }


async createAdmin(createAdminDto: CreateAdminDto): Promise<IAdmin> {
   const newAdmin = await new this.AdminModel(createAdminDto);
   return newAdmin.save();
}
async updateAdmin(AdminId: string, updateAdminDto: UpdateAdminDto): Promise<IAdmin> {
    const existingAdmin = await        this.AdminModel.findByIdAndUpdate(AdminId, updateAdminDto, { new: true });
   if (!existingAdmin) {
     throw new NotFoundException(`Admin #${AdminId} not found`);
   }
   return existingAdmin;
}
async getAllAdmins(): Promise<IAdmin[]> {
    const AdminData = await this.AdminModel.find();
    if (!AdminData || AdminData.length == 0) {
        throw new NotFoundException('Admins data not found!');
    }
    return AdminData;
}
async getAdmin(AdminId: string): Promise<IAdmin> {
   const existingAdmin = await     this.AdminModel.findById(AdminId).exec();
   if (!existingAdmin) {
    throw new NotFoundException(`Admin #${AdminId} not found`);
   }
   return existingAdmin;
}
async deleteAdmin(AdminId: string): Promise<IAdmin> {
    const deletedAdmin = await this.AdminModel.findByIdAndDelete(AdminId);
   if (!deletedAdmin) {
     throw new NotFoundException(`Admin #${AdminId} not found`);
   }
   return deletedAdmin;
}
}