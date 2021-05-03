import { Module } from '@nestjs/common';
import { ControlerController } from './controler/controler.controller';
import { UserService } from './service/user/user.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../entity/user.entity'
import {Credentials} from '../entity/credentials.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, Credentials])],
  controllers: [ControlerController],
  providers: [UserService]
})
export class UserModule {}
