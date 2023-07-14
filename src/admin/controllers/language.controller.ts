import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LanguagesService } from 'src/services/languages.service';
import { PaginationResponseInterceptor } from 'src/interceptors/paginationResponse.interceptor';
import { ItemResponseInterceptor } from 'src/interceptors/itemResponse.interceptor';
import { CreateLanguageDto, UpdateLanguageDto } from '../dtos/language.dts';

@ApiTags('Language')
@Controller('v1/languages')
export class LanguageController {
  constructor(private languageService: LanguagesService) {}

  @UseInterceptors(new PaginationResponseInterceptor())
  @Get()
  listing(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    return this.languageService.paginate(limit, page);
  }

  @Post()
  create(@Body() language: CreateLanguageDto) {
    return this.save(0, language);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() language: UpdateLanguageDto) {
    console.log('PUT')
    return this.save(id, language);
  }

  save(id: number, language: CreateLanguageDto) {
    return this.languageService.save(id, language, {

    });
  }

  @UseInterceptors(new ItemResponseInterceptor())
  @Get(':id')
  view(@Param('id') id: number) {
    return this.languageService.findOne({id});
  }
}