import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { FactureSchema } from './entities/Facture.entity';
import { FactureController } from './Facture.controller';
import { FactureService } from './Facture.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Facture', schema: FactureSchema }]),
  ],
  controllers: [FactureController],
  providers: [FactureService],
})
export class FactureModule {}
