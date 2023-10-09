import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { SchemaTypes, Types } from "mongoose";
@Schema()
export class Category {
   @Prop()
   name: string;
   @Prop()
   description: String;

   @Prop([{ type:SchemaTypes.ObjectId , ref:'subcategories'}])
    subcategories : Types.ObjectId[];    
   
}
export const CategorySchema = SchemaFactory.createForClass(Category);