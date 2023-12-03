import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateRoleDto) {
    const { name } = dto;
    return await this.prisma.roles.create({
      data: {
        name,
      },
    });
  }

  async findAll() {
    const count = await this.prisma.roles.count();
    const categories = await this.prisma.roles.findMany();
    return {
      count,
      categories,
    };
  }

  async findOne(id: number) {
    return await this.prisma.roles.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, dto: UpdateRoleDto) {
    return await this.prisma.roles.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: number) {
    return await this.prisma.roles.delete({
      where: {
        id,
      },
    });
  }
}
