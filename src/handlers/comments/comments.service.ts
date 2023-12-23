import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CommentsQuery } from './dto/query.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateCommentDto) {
    const { article_id, content, user_id } = dto;
    return this.prisma.comments.create({
      data: {
        article_id,
        content,
        user_id,
      },
    });
  }

  async findAll(query: CommentsQuery) {
    const { page, limit } = query;
    const count = await this.prisma.comments.count();
    const comments = await this.prisma.comments.findMany({
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
      include: {
        user: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
        article: true,
      },
    });
    return {
      count,
      comments,
    };
  }

  async findOne(id: number) {
    return await this.prisma.comments.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, dto: UpdateCommentDto) {
    const { content } = dto;
    return await this.prisma.comments.update({
      where: {
        id,
      },
      data: {
        content,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.comments.delete({
      where: {
        id,
      },
    });
  }
}
