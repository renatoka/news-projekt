import { Injectable } from '@nestjs/common';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class StatisticsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateStatisticDto) {
    const { article_id, views, likes, dislikes } = dto;
    return await this.prisma.statistics.create({
      data: {
        article_id,
        views,
        likes,
        dislikes,
      },
    });
  }

  async findAll() {
    const count = await this.prisma.statistics.count();
    const data = await this.prisma.statistics.findMany();
    return { count, data };
  }

  async findOne(id: number) {
    return await this.prisma.statistics.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, dto: UpdateStatisticDto) {
    const { article_id, views, likes, dislikes } = dto;
    return await this.prisma.statistics.update({
      where: {
        id,
      },
      data: {
        article_id,
        views,
        likes,
        dislikes,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.statistics.delete({
      where: {
        id,
      },
    });
  }
}
