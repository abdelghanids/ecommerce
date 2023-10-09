import { Document } from 'mongoose';
export interface IProvider extends Document{
    readonly matricule: string;
   
  readonly service: string;

  readonly company : string ;
   
}