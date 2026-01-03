import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'email', type: 'varchar' })
  email!: string

  @Column({ name: 'login', type: 'varchar' })
  login!: string

  @Column({ name: 'phone', type: 'varchar' })
  phone!: string

  @Column({ name: 'password', type: 'varchar' })
  password!: string

  @Column({ name: 'name_first', type: 'varchar' })
  nameFirst!: string

  @Column({ name: 'name_last', type: 'varchar' })
  nameLast!: string
}
