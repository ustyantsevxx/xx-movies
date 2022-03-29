import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindConditions, Repository } from 'typeorm'

import { AuthService } from '../auth/auth.service'
import { User } from './entities/user.entity'
import { CreateUserOptions } from './types'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
  ) {}

  findUser(where: FindConditions<User>) {
    return this.usersRepository.findOne({ where })
  }

  async findPasswordHashById(userId: number) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .select('user.id')
      .addSelect('user.password')
      .where('user.id = :id', { id: userId })
      .getOne()

    return user.password
  }

  async createUser(options: CreateUserOptions) {
    if (await this.findUser({ email: options.email })) {
      throw new BadRequestException('User with given email already exist')
    }

    const passwordHash = await this.authService.hashPassword(options.password)
    const newUser = this.usersRepository.create({
      email: options.email,
      name: options.name,
      password: passwordHash
    })

    await this.usersRepository.save(newUser)

    const { password: _, ...createdUser } = newUser
    return createdUser
  }
}
