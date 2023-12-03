import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  role_id: number;

  @IsString()
  @IsNotEmpty()
  avatar_image: string;

  constructor(
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    password: string,
    role_id: number,
    avatar_image: string,
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role_id = role_id;
    this.avatar_image = avatar_image;
  }
}
