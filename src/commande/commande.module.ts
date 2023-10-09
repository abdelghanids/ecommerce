import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { CommandeSchema } from './entities/Commande.entity';
import { CommandeController } from './commande.controller';
import { CommandeService } from './commande.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Commande', schema: CommandeSchema }]),
  ],
  controllers: [CommandeController],
  providers: [CommandeService],
})
export class CommandeModule {}
