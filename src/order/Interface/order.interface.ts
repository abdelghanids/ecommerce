import { Document } from 'mongoose';
export interface IOrder extends Document{
    readonly qte: number;
    readonly price: number;
   
}