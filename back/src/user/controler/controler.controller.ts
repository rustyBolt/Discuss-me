import { Controller, Get, Post } from '@nestjs/common';
import {Body} from '@nestjs/common/decorators/http/route-params.decorator';
import {UserService} from 'src/user/service/user/user.service';
import { TakenDto } from "src/user/dto/taken.dto";
import { LoginDto } from "src/user/dto/login.dto";

@Controller('user')
export class ControlerController {
    constructor(private userService: UserService){}

    @Post()
    create(@Body() taken: TakenDto){
        this.userService.create(taken);
    }

    @Post('login')
    login(@Body() cred: LoginDto): Promise<string>{
        return this.userService.login(cred);
    }
}
