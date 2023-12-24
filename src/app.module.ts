import { Module } from '@nestjs/common';
import { ArticlesController } from './handlers/articles/articles.controller';
import { CategoriesController } from './handlers/categories/categories.controller';
import { CommentsController } from './handlers/comments/comments.controller';
import { RolesController } from './handlers/roles/roles.controller';
import { StatisticsController } from './handlers/statistics/statistics.controller';
import { UsersController } from './handlers/users/users.controller';
import { ArticlesService } from './handlers/articles/articles.service';
import { CategoriesService } from './handlers/categories/categories.service';
import { CommentsService } from './handlers/comments/comments.service';
import { RolesService } from './handlers/roles/roles.service';
import { StatisticsService } from './handlers/statistics/statistics.service';
import { UsersService } from './handlers/users/users.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './handlers/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
      global: true,
    }),
  ],
  controllers: [
    ArticlesController,
    CategoriesController,
    CommentsController,
    RolesController,
    StatisticsController,
    UsersController,
  ],
  providers: [
    ArticlesService,
    CategoriesService,
    CommentsService,
    RolesService,
    StatisticsService,
    UsersService,
    PrismaService,
  ],
})
export class AppModule {}
