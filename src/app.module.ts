import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';
import { SubCategoriesModule } from './subcategories/subcategories.module';
import { UsersModule } from './users/users.module';

import { ProductModule }  from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ProviderModule } from './provider/provider.module';
import { AdminModule } from './admin/admin.module';
import { CommandeModule } from './commande/commande.module';
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './order/order.module';
import { FactureModule } from './facture/facture.module';
import { AuthModule } from './auth/auth.module';





@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: 'e_commerceDb',
    }),
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    JwtModule.register({
      secret: 'your_secret_key_here',
      signOptions: { expiresIn: '1d' },
    }),
    CategoriesModule,
    ProductModule,
    SubCategoriesModule,
    UsersModule,
    AuthModule,
    AdminModule,
    ProviderModule,
    CommandeModule,
    CustomerModule,
    OrderModule,
    FactureModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
