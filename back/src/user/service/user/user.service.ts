import { Injectable } from '@nestjs/common';
import { UserDto } from "src/user/dto/user.dto";
import { CredentialsDto } from "src/user/dto/credentials.dto";
import { TakenDto } from "src/user/dto/taken.dto";
import { InjectRepository } from '@nestjs/typeorm';
import {User} from '../../../entity/user.entity';
import {Credentials} from '../../../entity/credentials.entity'
import {Repository} from 'typeorm';
import {hash, compare} from 'bcrypt';
import { LoginDto } from "src/user/dto/login.dto";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Credentials)
        private credentialRepository: Repository<Credentials>,

        private jwtService: JwtService
    ){}

    async create(taken: TakenDto){
        let credentials = new CredentialsDto();
        let user = new UserDto();

        let result = await this.credentialRepository.createQueryBuilder("credentials")
              .where("credentials.email = :email", {email: taken.email})
              .select(["id_credentials", "email", "password"]).execute();

        if (result.length > 0){
            return 'User already created account with this email!';
        }

        let result2 = await this.userRepository.createQueryBuilder("user")
              .where("user.username = :username", {username: taken.username})
              .select(["username"]).execute();

        if (result2.length > 0){
            return 'Username already taken!';
        }

        credentials.email = taken.email;
        credentials.password = await hash(taken.password, 10);

        await this.credentialRepository.save(credentials);

        // let result = await this.credentialRepository.createQueryBuilder("credentials")
        //      .where("credentials.email = :email", {email: taken.email})
        //      .select(["id_credentials", "email", "password"]).execute();

        user.username = taken.username;
        user.id_credentials = credentials;

        let ret = this.userRepository.save(user);

        console.log(ret);
        return 'Success';
    }

    async login(cred: LoginDto){

        let pass = await this.credentialRepository.createQueryBuilder("credentials")
            .where("credentials.email = :email", {email: cred.email})
            .select(["id_credentials", "password"]).execute();

        if (pass.length > 0){

            let same = await compare(cred.password, pass[0].password);

            if (same){
                let user = await this.userRepository.createQueryBuilder("user")
                .where("user.idCredentialsIdCredentials = :id", {id: pass[0].id_credentials})
                .select(["id_user", "username"]).execute();

                return {
                    access_token: this.jwtService.sign(user[0]),
                };
            }
        }

        return "Incorrect email or password!";
    }
}
