import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDTO } from './dto/login-auth.dto';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}
  async signup(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  async login(loginDto: LoginDTO) {
    const { email, password } = loginDto;
    const user = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new ConflictException('USER_NOT_FOUND');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('INVALID_CREDENTIALS');
    }

    const { password: _, ...rest } = user;
    const payload = {
      user: rest,
    };

    const access_token = this.jwt.sign(payload, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: '1d',
    });

    return access_token;
  }

  async getTokenData(token: string) {
    console.log(token);
  }
}
