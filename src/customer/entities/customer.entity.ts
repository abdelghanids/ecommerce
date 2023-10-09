import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument, SchemaTypes, Types } from "mongoose";
import { User } from "src/users/entities/user.entity";

export type CustmerDocument = HydratedDocument<Customer>
@Schema()
export class Customer extends User{
   item: string;
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

export const CustomerSchema = SchemaFactory.createForClass(Customer);

export { User };
