import { Injectable } from '@nestjs/common';
import { UserDto } from "src/user/dto/user.dto";
import { CredentialsDto } from "src/user/dto/credentials.dto";
import { TakenDto } from "src/user/dto/taken.dto";
import { InjectRepository } from '@nestjs/typeorm';
import {User} from '../../../entity/user.entity';
import {Credentials} from '../../../entity/credentials.entity'
import {Repository} from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Credentials)
        private credentialRepository: Repository<Credentials>
    ){}

    async create(taken: TakenDto){
        let credentials = new CredentialsDto();
        let user = new UserDto();

        credentials.email = taken.email;
        credentials.password = taken.password;

        await this.credentialRepository.save(credentials);

        let result = await this.credentialRepository.createQueryBuilder("credentials")
             .where("credentials.email = :email", {email: taken.email})
             .select(["id_credentials", "email", "password"]).execute();

         user.username = taken.username;
         user.id_credentials = result[0];

         this.userRepository.save(user);
    }
}
