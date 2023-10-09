import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
export class CreateProductDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    @ApiProperty({
        type:'string',
        description:"this required properities"
    })
    readonly ref: string;
   

   
    @ApiProperty({
        type:'string',
        description:"this required properities"
    })
    readonly price: number;


    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    @ApiProperty({
        type:'string',
        description:"this required properities"
    })
    readonly description: string;

    @ApiProperty({
        type:'string',
        description:"this required properities"
    })
    galleries: string[];


    
 
    @ApiProperty({
        type:'string',
        description:"this required properities"
    })
    readonly qte: number;

   //// @IsString()
    //@MaxLength(30)
   // @IsNotEmpty()
    @ApiProperty({
        type:'string',
        description:"this required properities"
    })
    readonly subCategory: string;
    
}
