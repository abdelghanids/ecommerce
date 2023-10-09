import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { SchemaTypes, Types } from "mongoose";
@Schema()
export class SubCategory {
   @Prop()
   name: string;
   @Prop()
   description: String;

   @Prop({ type:SchemaTypes.ObjectId , ref:'categories'})
   categories : Types.ObjectId;    

   // @Prop([{ type:SchemaTypes.ObjectId , ref:'product'}])
   //  product : Types.ObjectId[];    
   
   
}
export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
