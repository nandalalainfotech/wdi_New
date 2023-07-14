import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/entities/user.entity';
import { ItemResponseInterceptor } from 'src/interceptors/itemResponse.interceptor';
import { PaginationResponseInterceptor } from 'src/interceptors/paginationResponse.interceptor';
import { UsersService } from 'src/services/users.service';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dts';

@ApiTags('User')
@Controller('v1/users')
export class UserController {
  saltRounds = 10;
  constructor(@InjectRepository(UserEntity)
  private readonly repository: Repository<UserEntity>,
    private userService: UsersService) { }

  @UseInterceptors(new PaginationResponseInterceptor())
  @Get()
  listing(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    return this.userService.paginate(limit, page);
  }

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.save(0, user);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() user: UpdateUserDto) {
    console.log('PUT')
    return this.save(id, user);
  }

  async save(id: number, user: CreateUserDto) {
    let userss = await this.repository.findOne({ where: { email: user.email } });
    const hash = await bcrypt.hash(user.password, this.saltRounds);
    user.password = hash;
    this.userService.save(id, user, {
    });
    user.password = '';
    return user;
  }

  @UseInterceptors(new ItemResponseInterceptor())
  @Get(':id')
  view(@Param('id') id: number) {
    return this.repository.findOne({ where: { id: id } });
  }
}