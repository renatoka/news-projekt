import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateUserDto) {
    const {
      username,
      email,
      password,
      role_id,
      first_name,
      last_name,
      avatar_image,
    } = dto;

    const user = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      throw new ConflictException('USER_EXISTS');
    }

    return await this.prisma.users.create({
      data: {
        first_name,
        last_name,
        username,
        email,
        password: await bcrypt.hash(password, 10),
        avatar_image,
        role: {
          connect: {
            id: role_id,
          },
        },
      },
    });
  }

  async findAll() {
    const count = await this.prisma.users.count();
    const users = await this.prisma.users.findMany({
      include: {
        role: true,
      },
      orderBy: {
        role_id: 'asc',
      },
    });
    return {
      count,
      users,
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        id,
      },
      include: {
        role: {
          select: {
            name: true,
          },
        },
        comments: {
          include: {
            article: true,
          },
        },
        user_authors: {
          where: {
            user_id: id,
          },
          include: {
            article: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });
    const { password, ...rest } = user;
    return rest;
  }

  async update(id: string, dto: UpdateUserDto) {
    const { username, email, password, first_name, last_name } = dto;
    return await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        username,
        password,
        email,
        first_name,
        last_name,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.users.delete({
      where: {
        id,
      },
    });
  }
}
