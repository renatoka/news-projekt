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

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
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

    return {
      access_token: await this.jwt.signAsync(payload),
    };
  }
}
