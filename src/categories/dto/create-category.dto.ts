import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
export class CreateCategoryDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    @ApiProperty({
        type:'string',
        description:"this required properities"
    })
    readonly name: string;
   
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    @ApiProperty({
        type:'string',
        description:"this required properities"
    })
    readonly decsription: string;
    
}
