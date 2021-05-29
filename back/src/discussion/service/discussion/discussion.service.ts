import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Discussion} from '../../../entity/discussion.entity';
import {DiscussionDto} from 'src/discussion/dto/discussion.dto';

@Injectable()
export class DiscussionService {
    constructor(
        @InjectRepository(Discussion)
        private discussionRepository: Repository<Discussion>
    ){}

    async addDiscussion(data: any){
        console.log(data);
        let adding = new Discussion();
        adding.name = data.name;
        adding.description = data.description;
        this.discussionRepository.save(adding);
    }

    async everything(){
        let ret =  await this.discussionRepository.createQueryBuilder("discussion")
            .select(["id_discussion", "name", "description"]).execute();

        console.log(ret);
        return ret;
    }
}
