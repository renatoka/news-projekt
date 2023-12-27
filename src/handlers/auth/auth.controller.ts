import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDTO } from './dto/login-auth.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { GetTokenData } from '../../decorators/token.decorator';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Get('get-token-data')
  getTokenData(@GetTokenData() data: any) {
    return data;
  }

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('signin')
  login(@Body() loginDto: LoginDTO) {
    return this.authService.login(loginDto);
  }
}
