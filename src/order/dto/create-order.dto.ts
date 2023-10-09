import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
export class CreateOrderDto {
   
    
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    @ApiProperty({
        type:'string',
        description:"this required properities"
    })
    readonly qte: number;
    

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    @ApiProperty({
        type:'string',
        description:"this required properities"
    })
    readonly price: number;
    
}