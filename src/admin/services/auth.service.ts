import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

import { comparePassword } from "src/utilities/security.utility";
import { UsersService } from "src/services/users.service";
import { AuthLoginDto } from "../dtos/authLogin.dts";
import { UserEntity } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserEntity) 
    private readonly repository: Repository<UserEntity>,
    private usersService: UsersService, 
    private jwtService: JwtService) { }


  async login(credentials: AuthLoginDto) {
    console.log("credentials====2", credentials);
    const email = credentials.email;
    console.log("email====2", email);
    const user = await this.repository.findOne({ where: { email: credentials.email } });
    console.log("user====3", user);
    let authenticated = false
    if (user?.id) {
      authenticated = await comparePassword(credentials.password, user.password)
    }
    if (!authenticated) {
      throw new UnauthorizedException('Invalid account details');
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user
    };
  }
}