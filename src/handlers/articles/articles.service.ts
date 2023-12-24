import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import slugify from 'slugify';
import { ArticlesQuery } from './dto/query.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateArticleDto) {
    const { title, description, content, image, category_id, approval_state } =
      dto;
    return await this.prisma.articles.create({
      data: {
        title,
        description,
        content,
        image,
        category_id,
        approval_state,
        slug: slugify(title, { lower: true, strict: true }),
      },
    });
  }

  async findAll(query: ArticlesQuery) {
    const { title, category, approval_state } = query;
    const where: Prisma.articlesWhereInput = {
      ...(category ? { category: { name: category } } : {}),
      ...(approval_state == 'all' ? {} : { approval_state }),
      ...(title ? { title: { contains: title } } : {}),
    };
    const count = await this.prisma.articles.count({
      where,
    });
    const articles = await this.prisma.articles.findMany({
      where,
      include: {
        category: true,
        comments: true,
        statistics: true,
        user_authors: {
          select: {
            user: {
              select: {
                first_name: true,
                last_name: true,
              },
            },
          },
        },
      },
      orderBy: [
        {
          created_at: 'desc',
        },
        {
          updated_at: 'desc',
        },
      ],
    });
    return {
      count,
      articles,
    };
  }

  async findAllAdmin(query: ArticlesQuery) {
    const { title, category, approval_state, page, limit } = query;
    const where: Prisma.articlesWhereInput = {
      ...(category ? { category: { name: category } } : {}),
      ...(approval_state == 'all' ? {} : { approval_state }),
      ...(title ? { title: { contains: title } } : {}),
    };
    const count = await this.prisma.articles.count({
      where,
    });
    const articles = await this.prisma.articles.findMany({
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
      where,
      include: {
        category: true,
        comments: true,
        statistics: true,
        user_authors: {
          select: {
            user: {
              select: {
                first_name: true,
                last_name: true,
              },
            },
          },
        },
      },
      orderBy: [
        {
          created_at: 'desc',
        },
        {
          updated_at: 'desc',
        },
      ],
    });
    return {
      count,
      articles,
    };
  }

  async findOne(id: number) {
    return await this.prisma.articles.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        comments: {
          include: {
            user: true,
          },
        },
        statistics: true,
        user_authors: {
          select: {
            user: true,
          },
        },
      },
    });
  }

  async update(id: number, dto: UpdateArticleDto) {
    const { title, description, content, image, category_id, approval_state } =
      dto;
    return await this.prisma.articles.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        content,
        image,
        category_id,
        approval_state,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.articles.delete({
      where: {
        id,
      },
    });
  }
}
