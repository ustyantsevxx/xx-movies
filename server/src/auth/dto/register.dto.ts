import { IsEmail, IsString, MinLength } from 'class-validator'

export class RegisterDto {
  @IsEmail(undefined, { message: 'Incorrect Email format' })
  email: string

  @IsString()
  name: string

  @MinLength(8, {
    message: ({ constraints: [min] }) =>
      `Password must be at least ${min} characters`
  })
  password: string
}
