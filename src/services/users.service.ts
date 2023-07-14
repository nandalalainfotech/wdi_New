import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserEntity } from "src/entities/user.entity";
import { BaseService } from "./base.service";
import { CreateUserDto } from "src/admin/dtos/user.dts";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService extends BaseService {
  saltRounds = 10;
  constructor(
    @InjectRepository(UserEntity)
    repo: Repository<UserEntity>,
  ) {
    super()
    this.repository = repo
  }
  // async create(user: CreateUserDto): Promise<CreateUserDto> {
  //   const hash = await bcrypt.hash(user.password, this.saltRounds);
  //   user.password = hash;
  //   this.repository.save(user);
  //   user.password = '';
  //   console.log("user====3", user);
  //   return user;
  // }
}