import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PagesService } from 'src/services/pages.service';
import { PaginationResponseInterceptor } from 'src/interceptors/paginationResponse.interceptor';
import { ItemResponseInterceptor } from 'src/interceptors/itemResponse.interceptor';
import { CreatePageDto, UpdatePageDto } from '../dtos/page.dts';
import { InjectRepository } from '@nestjs/typeorm';
import { PageEntity } from 'src/entities/page.entity';
import { Repository } from 'typeorm';

@ApiTags('Page')
@Controller('v1/pages')
export class PageController {
  constructor(@InjectRepository(PageEntity)
  private readonly repository: Repository<PageEntity>,
  private pageService: PagesService) {}

  @UseInterceptors(new PaginationResponseInterceptor())
  @Get()
  listing(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    return this.pageService.paginate(limit, page);
  }

  @Post()
  create(@Body() page: CreatePageDto) {
    this.save(0, page);
    return page;
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() page: UpdatePageDto) {
    this.save(id, page);
    return page;
  }

  save(id: number, page: CreatePageDto | UpdatePageDto) {
    return this.pageService.save(id, page, {

    });
  }

  @UseInterceptors(new ItemResponseInterceptor())
  @Get(':id')
  view(@Param('id') id: number) {
    return this.repository.findOne({ where: { id: id } });
  }
}