import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  @IsNotEmpty()
  article_id: number;

  constructor(content: string, user_id: number, article_id: number) {
    this.content = content;
    this.user_id = user_id;
    this.article_id = article_id;
  }
}
