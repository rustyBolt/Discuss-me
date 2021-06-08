import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Discussion} from '../../../entity/discussion.entity';
import {Comment} from '../../../entity/comment.entity';
import {Group} from '../../../entity/group.entity';
import {User} from '../../../entity/user.entity';
import {DiscussionDto} from 'src/discussion/dto/discussion.dto';

@Injectable()
export class DiscussionService {
    constructor(
        @InjectRepository(Discussion)
        private discussionRepository: Repository<Discussion>,

        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,

        @InjectRepository(Group)
        private groupRepository: Repository<Group>
    ){}

    async addDiscussion(data: any){
        console.log(data);
        let adding = new Discussion();
        adding.name = data.name;
        adding.description = data.description;
        return await this.discussionRepository.save(adding);
    }

    async getDiscussion(id: any){
        let ret = await this.discussionRepository.findOne(id.id, {
                                relations: ['comments', 'groups', 'groups.users']});

        console.log(ret);

        return ret;
    }

    async addComment(data: any){
        console.log(data);
        let comment = new Comment();
        let discussion = new Discussion();
        let dis = await this.getDiscussion({id: data.id_discussion});

        discussion.id_discussion = dis.id_discussion;
        discussion.name = dis.name;
        discussion.description = dis.description;

        comment.username = data.username;
        comment.content = data.content;
        comment.answer_to = data.answer_to;
        comment.discussion = discussion;

        let ret = await this.commentRepository.save(comment);
        return ret;
    }

    async addGroup(data: any){
        let group = new Group();
        let user = new User();
        let discussion = new Discussion();

        user.id_user = data.id_user;
        user.username = data.username;

        discussion.id_discussion = data.id_discussion;
        discussion.name = data.name_discussion;
        discussion.description = data.description_discussion;

        group.name = data.name;
        group.description = data.description;
        group.discussion = discussion;
        group.users = [user];

        let res = await this.groupRepository.save(group);

        return res;
    }

    async leave(data: any){
        let group = await this.groupRepository.findOne(data.id_group, {
            relations: ['users']});

        let newUsers = [];

        for (const person of group.users){
            if (person.id_user !== data.id_user){
              newUsers.push(person);
            }
        }
        
        group.users = newUsers;

        this.groupRepository.save(group);
    }

    async join(data: any){
        let group = await this.groupRepository.findOne(data.id_group, {
            relations: ['users']});

        let user = new User();
        
        user.id_user = data.id_user;
        user.username = data.username;
        
        group.users.push(user);

        this.groupRepository.save(group);
    }

    async everything(){
        let ret =  await this.discussionRepository.createQueryBuilder("discussion")
            .select(["id_discussion", "name", "description"]).execute();

        console.log(ret);
        return ret;
    }
}
