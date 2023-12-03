import { Article } from '../../articles/entities/article.entity';

export class Category {
  id: number;
  name: string;
  articles: Article[];
  link_color?: string;

  constructor(
    id: number,
    name: string,
    articles: Article[],
    link_color?: string,
  ) {
    this.id = id;
    this.name = name;
    this.articles = articles;
    this.link_color = link_color;
  }
}
