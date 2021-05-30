import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Discussion} from '../../../entity/discussion.entity';
import {Comment} from '../../../entity/comment.entity';
import {DiscussionDto} from 'src/discussion/dto/discussion.dto';

@Injectable()
export class DiscussionService {
    constructor(
        @InjectRepository(Discussion)
        private discussionRepository: Repository<Discussion>,

        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>
    ){}

    async addDiscussion(data: any){
        console.log(data);
        let adding = new Discussion();
        adding.name = data.name;
        adding.description = data.description;
        this.discussionRepository.save(adding);
    }

    async getDiscussion(id: any){
        let ret = await this.discussionRepository.findOne(id.id, {
                                relations: ['comments', 'groups']});

        console.log(ret);

        return ret;
    }

    async addComment(data: any){
        console.log(data);
        let comment = new Comment();
        let discussion = new Discussion();
        let dis = await this.getDiscussion(data.id);

        discussion.id_discussion = dis.id_discussion;
        discussion.name = dis.name;
        discussion.description = dis.description;

        comment.username = data.username;
        comment.content = data.content;
        comment.answer_to = data.answer_to;
        comment.discussion = discussion;

        this.commentRepository.save(comment);
        return comment;
    }

    async everything(){
        let ret =  await this.discussionRepository.createQueryBuilder("discussion")
            .select(["id_discussion", "name", "description"]).execute();

        console.log(ret);
        return ret;
    }
}
