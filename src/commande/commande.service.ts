import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from "mongoose";
import { ICommande } from './Interface/Commande.interface';
import { CreateCommandeDto } from './dto/create-Commande.dto';
import { UpdateCommandeDto } from './dto/update-Commande.dto';

@Injectable()
export class CommandeService {
constructor(@InjectModel('Commande') private CommandeModel:Model<ICommande>) { }


async createCommande(createCommandeDto: CreateCommandeDto): Promise<ICommande> {
   const newCommande = await new this.CommandeModel(createCommandeDto);
   return newCommande.save();
}
async updateCommande(CommandeId: string, updateCommandeDto: UpdateCommandeDto): Promise<ICommande> {
    const existingCommande = await        this.CommandeModel.findByIdAndUpdate(CommandeId, updateCommandeDto, { new: true });
   if (!existingCommande) {
     throw new NotFoundException(`Commande #${CommandeId} not found`);
   }
   return existingCommande;
}
async getAllCommandes(): Promise<ICommande[]> {
    const CommandeData = await this.CommandeModel.find();
    if (!CommandeData || CommandeData.length == 0) {
        throw new NotFoundException('Commandes data not found!');
    }
    return CommandeData;
}
async getCommande(CommandeId: string): Promise<ICommande> {
   const existingCommande = await     this.CommandeModel.findById(CommandeId).exec();
   if (!existingCommande) {
    throw new NotFoundException(`Commande #${CommandeId} not found`);
   }
   return existingCommande;
}
async deleteCommande(CommandeId: string): Promise<ICommande> {
    const deletedCommande = await this.CommandeModel.findByIdAndDelete(CommandeId);
   if (!deletedCommande) {
     throw new NotFoundException(`Commande #${CommandeId} not found`);
   }
   return deletedCommande;
}
}