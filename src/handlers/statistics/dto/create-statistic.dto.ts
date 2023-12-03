import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStatisticDto {
  @IsNumber()
  @IsNotEmpty()
  article_id: number;

  @IsNumber()
  @IsNotEmpty()
  views: number;

  @IsNumber()
  @IsNotEmpty()
  likes: number;

  @IsNumber()
  @IsNotEmpty()
  dislikes: number;

  constructor(
    article_id: number,
    views: number,
    likes: number,
    dislikes: number,
  ) {
    this.article_id = article_id;
    this.views = views;
    this.likes = likes;
    this.dislikes = dislikes;
  }
}
