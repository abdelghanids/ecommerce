import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './entities/Order.entity';
import { OrderController } from './Order.controller';
import { OrderService } from './Order.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
