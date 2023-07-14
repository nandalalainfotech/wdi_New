import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { LocaleDirectionEnum } from "src/enums/localeDirection.enum";
import { StatusEnum } from "src/enums/status.enum";

export class FormDto {
    @ApiProperty()
    @IsNotEmpty()
    title: string;
  
    @ApiProperty()
    @IsEnum(StatusEnum)
    @IsOptional()
    status: number;
}

export class CreatePageDto extends FormDto {
}

export class UpdatePageDto extends FormDto {
}