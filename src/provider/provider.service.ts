import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from "mongoose";
import { IProvider } from './Interface/Provider.interface';

import { UpdateProviderDto } from './dto/update-Provider.dto';
import { CreateProviderDto } from './dto/create-Provider.dto';

@Injectable()
export class ProviderService {
constructor(@InjectModel('Provider') private ProviderModel:Model<IProvider>) { }


async createProvider(createProviderDto: CreateProviderDto): Promise<IProvider> {
   const newProvider = await new this.ProviderModel(createProviderDto);
   return newProvider.save();
}
async updateProvider(ProviderId: string, updateProviderDto: UpdateProviderDto): Promise<IProvider> {
    const existingProvider = await        this.ProviderModel.findByIdAndUpdate(ProviderId, updateProviderDto, { new: true });
   if (!existingProvider) {
     throw new NotFoundException(`Provider #${ProviderId} not found`);
   }
   return existingProvider;
}
async getAllProviders(): Promise<IProvider[]> {
    const ProviderData = await this.ProviderModel.find();
    if (!ProviderData || ProviderData.length == 0) {
        throw new NotFoundException('Providers data not found!');
    }
    return ProviderData;
}
async getProvider(ProviderId: string): Promise<IProvider> {
   const existingProvider = await     this.ProviderModel.findById(ProviderId).exec();
   if (!existingProvider) {
    throw new NotFoundException(`Provider #${ProviderId} not found`);
   }
   return existingProvider;
}
async deleteProvider(ProviderId: string): Promise<IProvider> {
    const deletedProvider = await this.ProviderModel.findByIdAndDelete(ProviderId);
   if (!deletedProvider) {
     throw new NotFoundException(`Provider #${ProviderId} not found`);
   }
   return deletedProvider;
}
}