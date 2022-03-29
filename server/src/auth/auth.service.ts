import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare, genSalt, hash } from 'bcrypt'
import { User } from 'src/users/entities/user.entity'

import { UsersService } from '../users/users.service'
import { RegisterDto } from './dto/register.dto'
import { JWTPayload } from './types'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findUser({ email })
    if (!user) {
      return
    }

    const passwordHash = await this.usersService.findPasswordHashById(user.id)
    const passwordMatchesHash = await this.comparePasswordWithHash(
      password,
      passwordHash
    )

    if (passwordMatchesHash) {
      return user
    }
  }

  async hashPassword(password: string) {
    const salt = await genSalt()
    return hash(password, salt)
  }

  comparePasswordWithHash(password: string, hash: string) {
    return compare(password, hash)
  }

  getAccessToken(payload: JWTPayload) {
    return this.jwtService.sign(payload)
  }

  async login(user: User) {
    const payload: JWTPayload = { sub: user.id }
    return {
      user,
      accessToken: this.jwtService.sign(payload)
    }
  }

  async register(dto: RegisterDto) {
    const newUser = await this.usersService.createUser(dto)
    const accessToken = this.getAccessToken({ sub: newUser.id })
    return {
      user: newUser,
      accessToken
    }
  }
}
