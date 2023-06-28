import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(user: Partial<User>) {
    return this.usersRepository
      .createQueryBuilder('users')
      .insert()
      .values(user)
      .execute();
  }

  findOne(condition: Partial<User>) {
    return this.usersRepository
      .createQueryBuilder('users')
      .where({
        ...condition,
      })
      .select(['users.id', 'users.username', 'users.status'])
      .getOne();
  }

  findActiveUserByUsername(username: string) {
    return this.usersRepository
      .createQueryBuilder('users')
      .where({
        username,
        status: 1,
      })
      .select(['users.id', 'users.username', 'users.password'])
      .getOne();
  }
}
