import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Auth } from 'src/core/decorators/auth.decorator'
import { UserParam } from 'src/core/decorators/user.decorator'

import { User } from './entities/user.entity'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  /** Get current user */
  @Auth()
  @Get('me')
  getMe(@UserParam() user: User) {
    return user
  }
}
