import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UserParam } from 'src/core/decorators/user.decorator'
import { User } from 'src/users/entities/user.entity'

import { LocalAuthGuard } from '../core/guards/local-auth.guard'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** Login */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@UserParam() user: User) {
    return this.authService.login(user)
  }

  /** Register */
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }
}
