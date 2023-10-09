import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { ProviderSchema } from './entities/Provider.entity';
import { ProviderController } from './Provider.controller';
import { ProviderService } from './Provider.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Provider', schema: ProviderSchema }]),
  ],
  controllers: [ProviderController],
  providers: [ProviderService],
})
export class ProviderModule {}
