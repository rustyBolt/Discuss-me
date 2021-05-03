import { IsNumber, IsString } from "class-validator"
import { CredentialsDto } from "./credentials.dto"

export class UserDto {
    @IsNumber()
    id_user: number;

    @IsString()
    username: string;

    id_credentials: CredentialsDto;
}
