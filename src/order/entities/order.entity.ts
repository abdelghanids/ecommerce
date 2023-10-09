import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class Order {
    @Prop()
   qte: number;
   @Prop()
   price: number;
   

      
   
}
export const OrderSchema = SchemaFactory.createForClass(Order);