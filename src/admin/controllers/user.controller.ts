import { Body, Controller, DefaultValuePipe, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/services/users.service';
import { PaginationResponseInterceptor } from 'src/interceptors/paginationResponse.interceptor';
import { ItemResponseInterceptor } from 'src/interceptors/itemResponse.interceptor';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dts';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";

@ApiTags('User')
@Controller('v1/users')
export class UserController {
   saltRounds = 10;
  repository: any;
  constructor(private userService: UsersService,
    @InjectRepository(UserEntity) private readonly userEntity: Repository<UserEntity>) {}

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

    console.log("user11111111-------->", user);

    let userEntity = new UserEntity();
    userEntity = await this.userEntity.findOne({ where: { email: user.email} });

    if(!userEntity) {

    const hash = await bcrypt.hash(user.password, this.saltRounds);
    user.password = hash;
    this.userService.save(id, user, {});
    user.password = '';
    return user;
    }
    else {
      throw new HttpException('User Email Already Exists', HttpStatus.UNPROCESSABLE_ENTITY); 
    }
    
  }

  @UseInterceptors(new ItemResponseInterceptor())
  @Get(':id')
  view(@Param('id') id: number) {
    return this.userService.findOne({id});
  }
}