import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PagesService } from 'src/services/pages.service';
import { PaginationResponseInterceptor } from 'src/interceptors/paginationResponse.interceptor';
import { ItemResponseInterceptor } from 'src/interceptors/itemResponse.interceptor';
import { CreatePageDto, UpdatePageDto } from '../dtos/page.dts';

@ApiTags('Page')
@Controller('v1/pages')
export class PageController {
  constructor(private pageService: PagesService) {}

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
    return this.save(0, page);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() page: UpdatePageDto) {
    return this.save(id, page);
  }

  save(id: number, page: CreatePageDto | UpdatePageDto) {
    return this.pageService.save(id, page, {

    });
  }

  @UseInterceptors(new ItemResponseInterceptor())
  @Get(':id')
  view(@Param('id') id: number) {
    return this.pageService.findById(id);
  }
}