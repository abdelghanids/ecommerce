import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class Facture {
   @Prop()
   ref: string;
   @Prop()
   discription: string;
   @Prop()
   remise: number;
   

      
   
}
export const FactureSchema = SchemaFactory.createForClass(Facture);