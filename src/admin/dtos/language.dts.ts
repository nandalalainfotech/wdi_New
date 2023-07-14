import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { LocaleDirectionEnum } from "src/enums/localeDirection.enum";
import { StatusEnum } from "src/enums/status.enum";

export class FormDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    locale: string;

    @ApiProperty()
    @IsEnum(LocaleDirectionEnum)
    @IsNotEmpty()
    direction: string;
  
    @ApiProperty()
    @IsOptional()
    ordering: number;
  
    @ApiProperty()
    @IsOptional()
    default: number;
  
    @ApiProperty()
    @IsEnum(StatusEnum)
    @IsOptional()
    status: number;
}

export class CreateLanguageDto extends FormDto {
}

export class UpdateLanguageDto extends FormDto {
}