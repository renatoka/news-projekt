import { IsOptional, IsString } from 'class-validator';

export class ArticlesQuery {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  approval_state: string;

  constructor(title: string, category: string, approval_state: string) {
    this.title = title;
    this.category = category;
    this.approval_state = approval_state;
  }
}
