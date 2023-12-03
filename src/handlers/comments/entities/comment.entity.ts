import { Article } from '../../articles/entities/article.entity';
import { User } from '../../users/entities/user.entity';

export class Comment {
  id: number;
  content: string;
  user: User;
  user_id: number;
  post_id: number;
  article: Article;
  created_at: Date;
  updated_at: Date;

  constructor(
    id: number,
    content: string,
    user: User,
    user_id: number,
    post_id: number,
    article: Article,
    created_at: Date,
    updated_at: Date,
  ) {
    this.id = id;
    this.content = content;
    this.user = user;
    this.user_id = user_id;
    this.post_id = post_id;
    this.article = article;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
