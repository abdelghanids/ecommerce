import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { SchemaTypes, Types } from "mongoose";
@Schema()
export class Product {
   @Prop()
  ref: string;
   @Prop()
   price : number;
   @Prop()
   description: string;
   @Prop()
   galleries : string[];
   @Prop()
   qte : number;

   @Prop({ type:SchemaTypes.ObjectId , ref:'subcategories'})
   subcategories : Types.ObjectId;    
   
}
export const ProductSchema = SchemaFactory.createForClass(Product);