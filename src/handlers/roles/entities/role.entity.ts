import { User } from '../../users/entities/user.entity';

export class Role {
  id: number;
  name: string;
  users: User[];
  created_at: Date;

  constructor(id: number, name: string, users: User[], created_at: Date) {
    this.id = id;
    this.name = name;
    this.users = users;
    this.created_at = created_at;
  }
}
