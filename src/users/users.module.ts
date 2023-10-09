import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomerSchema } from 'src/customer/entities/Customer.entity';
import { UserSchema } from './entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "users", schema: UserSchema ,discriminators:[{name:"Customer",schema:CustomerSchema}]}]),
    
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}