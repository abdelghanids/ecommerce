import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"


@Schema()
export class Provider {
   @Prop()
   matricule: string;
   @Prop()
   company: String;
   @Prop()
   service: String;


  
   
}
export const ProviderSchema = SchemaFactory.createForClass(Provider);