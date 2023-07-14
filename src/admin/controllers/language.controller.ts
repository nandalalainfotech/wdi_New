import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LanguagesService } from 'src/services/languages.service';
import { PaginationResponseInterceptor } from 'src/interceptors/paginationResponse.interceptor';
import { ItemResponseInterceptor } from 'src/interceptors/itemResponse.interceptor';
import { CreateLanguageDto, UpdateLanguageDto } from '../dtos/language.dts';
import { LanguageEntity } from 'src/entities/language.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@ApiTags('Language')
@Controller('v1/languages')
export class LanguageController {
  constructor(@InjectRepository(LanguageEntity)
  private readonly repository: Repository<LanguageEntity>,
  private languageService: LanguagesService) {}

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
    this.save(0, language);
    return language;
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() language: UpdateLanguageDto) {
    console.log('PUT')
    this.save(id, language);
    return language;
  }

  save(id: number, language: CreateLanguageDto) {
    return this.languageService.save(id, language, {

    });
  }

  @UseInterceptors(new ItemResponseInterceptor())
  @Get(':id')
  view(@Param('id') id: number) {
    return this.repository.findOne({ where: { id: id } });
  }
}