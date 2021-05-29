import { Module } from '@nestjs/common';
import { ControllerController } from './controller/controller.controller';
import { DiscussionService } from './service/discussion/discussion.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../entity/user.entity';
import {Discussion} from '../entity/discussion.entity';
import {Group} from '../entity/group.entity';
import {Comment} from '../entity/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Discussion, Group, Comment])],
  controllers: [ControllerController],
  providers: [DiscussionService]
})
export class DiscussionModule {}
