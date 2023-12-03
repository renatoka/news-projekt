import { Article } from '../../articles/entities/article.entity';

export class Statistic {
  id: number;
  article_id: number;
  views: number;
  likes: number;
  dislikes: number;
  article: Article;
  created_at: Date;
  updated_at: Date;

  constructor(
    id: number,
    article_id: number,
    views: number,
    likes: number,
    dislikes: number,
    article: Article,
    created_at: Date,
    updated_at: Date,
  ) {
    this.id = id;
    this.article_id = article_id;
    this.views = views;
    this.likes = likes;
    this.dislikes = dislikes;
    this.article = article;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
