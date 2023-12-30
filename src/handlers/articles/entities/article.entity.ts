import { Category } from '../../categories/entities/category.entity';
import { Statistic } from '../../statistics/entities/statistic.entity';

export class Article {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string;
  category: Category;
  category_id: number;
  comments: Comment[];
  statistics: Statistic[];
  user_authors: [
    {
      user: {
        first_name: string;
        last_name: string;
        image: string;
      };
    },
  ];
  approval_state: string;
  slug: string;
  created_at: Date;
  updated_at: Date;

  constructor(
    id: number,
    title: string,
    description: string,
    content: string,
    image: string,
    category: Category,
    category_id: number,
    comments: Comment[],
    statistics: Statistic[],
    user_authors: [
      {
        user: {
          first_name: string;
          last_name: string;
          image: string;
        };
      },
    ],
    approval_state: string,
    slug: string,
    created_at: Date,
    updated_at: Date,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.content = content;
    this.image = image;
    this.category = category;
    this.category_id = category_id;
    this.comments = comments;
    this.statistics = statistics;
    this.user_authors = user_authors;
    this.approval_state = approval_state;
    this.created_at = created_at;
    this.slug = slug;
    this.updated_at = updated_at;
  }
}
