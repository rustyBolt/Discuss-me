import { Controller, Get, Post, Request } from '@nestjs/common';
import {Body} from '@nestjs/common/decorators/http/route-params.decorator';
import {DiscussionService} from 'src/discussion/service/discussion/discussion.service'
import {DiscussionDto} from 'src/discussion/dto/discussion.dto';

@Controller('discussion')
export class ControllerController {
    constructor(private discussionService: DiscussionService){}

    @Post()
    addDiscussion(@Body() data: any){
        this.discussionService.addDiscussion(data);
    }

    @Post('one')
    getDiscussion(@Body() id: any): Promise<any>{
        return this.discussionService.getDiscussion(id);
    }

    @Post('comment')
    addComment(@Body() data: any): Promise<any>{
        return this.discussionService.addComment(data);
    }

    @Get('all')
    everything(): Promise<any>{
        let ret =  this.discussionService.everything();
        return ret;
    }
}
