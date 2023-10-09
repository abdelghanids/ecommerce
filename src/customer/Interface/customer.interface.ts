import { Document } from 'mongoose';
export interface ICustomer extends Document{
    readonly picture: string;
   
    readonly adress: string;

    readonly cin: string;
   
    readonly city: string;

   
}