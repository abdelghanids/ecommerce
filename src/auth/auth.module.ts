import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { UsersModule } from 'src/users/users.module';
import { AccessTokenStrategy } from './strategies/accesToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';


@Module({
  imports: [JwtModule.register({}), UsersModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}