import { IsNumber, IsString } from "class-validator"

export class CredentialsDto {
    @IsNumber()
    id_credentials: number;

    @IsString()
    email: string;

    @IsString()
    password: string;
}
