import { ApiHideProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @ApiHideProperty()
  @Column({ select: false })
  password: string
}
