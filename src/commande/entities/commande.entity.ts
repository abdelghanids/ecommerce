import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { SchemaTypes, Types } from "mongoose";
@Schema()
export class Commande {
   @Prop()
   date: Date;
   @Prop()
   lieuLivraison: String;
   @Prop()
   etat: String;
   @Prop()
   typeLivaison: String;
   @Prop()
   delivryPrice: String;

      
   
}
export const CommandeSchema = SchemaFactory.createForClass(Commande);