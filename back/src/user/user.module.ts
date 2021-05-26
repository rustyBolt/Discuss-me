import { Module } from '@nestjs/common';
import { ControlerController } from './controler/controler.controller';
import { UserService } from './service/user/user.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../entity/user.entity';
import {Credentials} from '../entity/credentials.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { jwtConstants } from './constants';

@Module({
  imports: [TypeOrmModule.forFeature([User, Credentials]),
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '1d' },
        })],
  controllers: [ControlerController],
  providers: [UserService, JwtStrategy]
})
export class UserModule {}
