import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

import { comparePassword } from "src/utilities/security.utility";
import { UsersService } from "src/services/users.service";
import { AuthLoginDto } from "../dtos/authLogin.dts";
import { UserEntity } from "src/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async login(credentials: AuthLoginDto) {
    console.log("credentials====2", credentials);
    const email = credentials.email;
    console.log("email====2", email);
     const user = await this.usersService.findOne({where: {email:credentials.email}});
     console.log("user====3", user);
  }
}