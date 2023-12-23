import { IsOptional, IsString } from 'class-validator';

export class CommentsQuery {
  @IsString()
  @IsOptional()
  page: string;

  @IsString()
  @IsOptional()
  limit: string;

  constructor(page: string, limit: string) {
    this.page = page;
    this.limit = limit;
  }
}
