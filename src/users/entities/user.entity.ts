import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

import *  as argon2 from "argon2";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({discriminatorKey:"item"})
export class User {
   @Prop()
   username: string;
   @Prop()
   password: string;
   @Prop()
   email: string;


   
}
export const UserSchema = SchemaFactory.createForClass(User).pre("save",
async function(){
    this.password=await argon2.hash(this.password)
});
