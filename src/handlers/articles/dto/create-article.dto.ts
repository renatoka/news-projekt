import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsNumber()
  @IsNotEmpty()
  category_id: number;

  @IsString()
  @IsNotEmpty()
  approval_state: string;

  constructor(
    title: string,
    description: string,
    content: string,
    image: string,
    category_id: number,
    approval_state: string,
  ) {
    this.title = title;
    this.description = description;
    this.content = content;
    this.image = image;
    this.category_id = category_id;
    this.approval_state = approval_state;
  }
}
