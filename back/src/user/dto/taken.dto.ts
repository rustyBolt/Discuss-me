import { IsNumber, IsString } from "class-validator"

export class TakenDto {
    @IsString()
    username: string;

    @IsString()
    email: string;

    @IsString()
    password: string;
}
