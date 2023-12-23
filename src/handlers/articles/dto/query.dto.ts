import { IsOptional, IsString } from 'class-validator';

export class ArticlesQuery {
  @IsString()
  @IsOptional()
  page: string;

  @IsString()
  @IsOptional()
  limit: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  approval_state: string;

  constructor(
    title: string,
    category: string,
    approval_state: string,
    page: string,
    limit: string,
  ) {
    this.title = title;
    this.category = category;
    this.approval_state = approval_state;
    this.page = page;
    this.limit = limit;
  }
}
