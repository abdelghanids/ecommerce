import { Document } from 'mongoose';
export interface IFacture extends Document{
    readonly ref: string;
   
    readonly description: string;

    readonly remise: number;
   
    
}