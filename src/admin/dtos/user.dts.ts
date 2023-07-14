import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { StatusEnum } from "src/enums/status.enum";

export class FormDto {

    id: number; 
    
    @ApiProperty()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @ApiProperty()
    @IsNotEmpty()
    password: string;

    emailVerifiedAt: Date;

    emailToken: string;

    mobile: string;

    mobileVerifiedAt: Date;

    mobileToken: string;

    isAdmin: number;

    isSuper: number;

    status: StatusEnum;

    createdAt: Date;

    updatedAt: Date;

    deletedAt: Date;

}

export class CreateUserDto extends FormDto {
}

export class UpdateUserDto extends FormDto {
}