import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { CustomerController } from './Customer.controller';
import { CustomerService } from './Customer.service';
import { UserSchema } from 'src/users/entities/user.entity';
import { CustomerSchema } from './entities/Customer.entity';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'customers', schema: CustomerSchema }]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
