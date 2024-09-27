import { IsString } from "class-validator"

export class CreateBookDto {
    
    @IsString()
    title: string

    @IsString()
    author: string

    @IsString()
    publicationDate: string

    @IsString()
    genre: string
}
