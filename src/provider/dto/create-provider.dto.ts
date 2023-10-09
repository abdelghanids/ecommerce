import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
export class CreateProviderDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    @ApiProperty({
        type:'string',
        description:"this required properities"
    })
    readonly matricule: string;
   
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    @ApiProperty({
        type:'string',
        description:"this required properities"
    })
    readonly company: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    @ApiProperty({
        type:'string',
        description:"this required properities"
    })
    readonly service: string;
    
}
