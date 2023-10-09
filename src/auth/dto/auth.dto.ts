import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class AuthDto {
  @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    @ApiProperty({
        type:'string',
        description:"this required properities"
    })
    username: string;

    @IsString()
  
    @IsNotEmpty()
    @ApiProperty({
        type:'string',
        description:"this required properities"
    })
    password: string;
  }