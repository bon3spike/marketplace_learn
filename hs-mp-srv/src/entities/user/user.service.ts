import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { genSalt, hash } from 'bcrypt'
import { Repository } from 'typeorm'
import { RegisterUserDto } from './dto/registerUser.dto'

import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User, 'hs_marketplace')
    private readonly userRepository: Repository<User>
  ) {
    this.availableFields = ['nameFirst', 'nameLast', 'login', 'email', 'phone']
  }

  availableFields: string[]

  private filterFields(body: Record<string, any>) {
    const filteredBody: Record<string, any> = {}
    Object.keys(body)
      .filter((k) => this.availableFields.includes(k))
      .forEach((k) => {
        filteredBody[k] = body[k]
      })
    return filteredBody
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find()
  }

  async getUserById(id: number){
    return await this.userRepository.findOne({ 
      where: { id },
      select: this.availableFields as any })
  }

  async getUserByLoginOrEmail(loginOrEmail: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: [{ login: loginOrEmail }, { email: loginOrEmail }],
    })
  }


  async getUserData(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  async createUser(userData: RegisterUserDto){
    const salt = await genSalt(10)

    const hashedPassword = await hash(userData.password, salt)

    const newUser = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    })

    return this.userRepository.save(newUser)
  }

  async updateUserData(id: number, payload: Partial<User>): Promise<User> {
    const existing = await this.getUserData(id)
    const filtered = this.filterFields(payload as Record<string, any>)
    const toSave = this.userRepository.merge(existing, filtered)
    return this.userRepository.save(toSave)
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete({ id })
  }
}
