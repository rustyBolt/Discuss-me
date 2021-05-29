import { IsNumber, IsString } from "class-validator"

export class DiscussionDto {
    @IsNumber()
    id_discussion: number;

    @IsString()
    name: string;

    @IsString()
    description: string;
}
