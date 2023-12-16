import { user_author } from '@prisma/client';
import { Article } from '../../articles/entities/article.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Role } from '../../roles/entities/role.entity';

export class User {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  role_id: number;
  comments: Comment[];
  user_authors: {
    article_id: string;
    user_id: string;
    created_at: Date;
    updated_at: Date;
    article: Article;
  }[];
  avatar_image: string;
  created_at: Date;

  constructor(
    id: string,
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    password: string,
    role: Role,
    role_id: number,
    comments: Comment[],
    user_authors: {
      article_id: string;
      user_id: string;
      created_at: Date;
      updated_at: Date;
      article: Article;
    }[],
    avatar_image: string,
    created_at: Date,
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.role_id = role_id;
    this.comments = comments;
    this.user_authors = user_authors;
    this.avatar_image = avatar_image;
    this.created_at = created_at;
  }
}
