import {TypeOrmModule} from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DiscussionModule } from './discussion/discussion.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, DiscussionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
