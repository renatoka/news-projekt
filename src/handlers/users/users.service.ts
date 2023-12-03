import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';

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
    return await this.prisma.users.create({
      data: {
        first_name,
        last_name,
        username,
        email,
        password,
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
    });
    return {
      count,
      users,
    };
  }

  async findOne(id: number) {
    return await this.prisma.users.findUnique({
      where: {
        id,
      },
      include: {
        role: true,
      },
    });
  }

  async update(id: number, dto: UpdateUserDto) {
    const { username, email, password, role_id } = dto;
    return await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        username,
        email,
        password,
        role: {
          connect: {
            id: +role_id,
          },
        },
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.users.delete({
      where: {
        id,
      },
    });
  }
}
