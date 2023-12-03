import { Article } from '../../articles/entities/article.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Role } from '../../roles/entities/role.entity';

export class User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  role_id: number;
  comments: Comment[];
  articles: Article[];
  avatar_image: string;
  createdAt: Date;

  constructor(
    id: number,
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    password: string,
    role: Role,
    role_id: number,
    comments: Comment[],
    articles: Article[],
    avatar_image: string,
    createdAt: Date,
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
    this.articles = articles;
    this.avatar_image = avatar_image;
    this.createdAt = createdAt;
  }
}
