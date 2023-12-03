import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateCategoryDto) {
    const { name } = dto;
    return await this.prisma.categories.create({
      data: {
        name,
      },
    });
  }

  async findAll() {
    const count = await this.prisma.categories.count();
    const categories = await this.prisma.categories.findMany();
    return {
      count,
      categories,
    };
  }

  async findOne(id: number) {
    return await this.prisma.categories.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, dto: UpdateCategoryDto) {
    return await this.prisma.categories.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: number) {
    return await this.prisma.categories.delete({
      where: {
        id,
      },
    });
  }
}
