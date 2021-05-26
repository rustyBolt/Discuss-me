import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import {Body} from '@nestjs/common/decorators/http/route-params.decorator';
import {UserService} from 'src/user/service/user/user.service';
import { TakenDto } from "src/user/dto/taken.dto";
import { LoginDto } from "src/user/dto/login.dto";
import { JwtAuthGuard } from '../guard/jwt-login.guard';

@Controller('user')
export class ControlerController {
    constructor(private userService: UserService){}

    @Post()
    create(@Body() taken: TakenDto){
        this.userService.create(taken);
    }

    @Post('login')
    login(@Body() cred: LoginDto): Promise<any>{
        return this.userService.login(cred);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return {userId: req.user.id_user, username: req.user.username};
  }
}
