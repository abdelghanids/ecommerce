import { Document } from 'mongoose';
export interface ICommande extends Document{
    readonly date: Date;
   
    readonly etat: string;

    readonly lieuLivraison: string;
   
    readonly typeLivraison: string;

    readonly delivryPrice: string;
   
}