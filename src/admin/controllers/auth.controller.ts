import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from 'src/admin/services/auth.service';
import { AuthLoginDto } from 'src/admin/dtos/authLogin.dts';
import { AuthLoginResponseInterceptor } from '../interceptors/authLoginResponse.interceptor';
import { ApiBasicAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { PublicAccess } from 'src/decorators/core';

@ApiSecurity('x-api-key')
@PublicAccess()
@ApiTags('Auth')
@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(new AuthLoginResponseInterceptor())
  @Post('login')
  login(@Body() credentials: AuthLoginDto) {
    console.log("credentials====1", credentials);
    return this.authService.login(credentials);
  }
}