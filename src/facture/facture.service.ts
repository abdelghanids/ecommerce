import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from "mongoose";
import { IFacture } from './Interface/Facture.interface';
import { CreateFactureDto } from './dto/create-Facture.dto';
import { UpdateFactureDto } from './dto/update-Facture.dto';

@Injectable()
export class FactureService {
constructor(@InjectModel('Facture') private FactureModel:Model<IFacture>) { }


async createFacture(createFactureDto: CreateFactureDto): Promise<IFacture> {
   const newFacture = await new this.FactureModel(createFactureDto);
   return newFacture.save();
}
async updateFacture(FactureId: string, updateFactureDto: UpdateFactureDto): Promise<IFacture> {
    const existingFacture = await        this.FactureModel.findByIdAndUpdate(FactureId, updateFactureDto, { new: true });
   if (!existingFacture) {
     throw new NotFoundException(`Facture #${FactureId} not found`);
   }
   return existingFacture;
}
async getAllFactures(): Promise<IFacture[]> {
    const FactureData = await this.FactureModel.find();
    if (!FactureData || FactureData.length == 0) {
        throw new NotFoundException('Factures data not found!');
    }
    return FactureData;
}
async getFacture(FactureId: string): Promise<IFacture> {
   const existingFacture = await     this.FactureModel.findById(FactureId).exec();
   if (!existingFacture) {
    throw new NotFoundException(`Facture #${FactureId} not found`);
   }
   return existingFacture;
}
async deleteFacture(FactureId: string): Promise<IFacture> {
    const deletedFacture = await this.FactureModel.findByIdAndDelete(FactureId);
   if (!deletedFacture) {
     throw new NotFoundException(`Facture #${FactureId} not found`);
   }
   return deletedFacture;
}
}