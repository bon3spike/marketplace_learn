import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { genSalt, hash } from 'bcrypt'
import { Repository } from 'typeorm'

import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User, 'hs_marketplace')
    private readonly userRepository: Repository<User>
  ) {
    this.availableFields = ['nameFirst', 'nameLast', 'email', 'gender', 'birthDate']
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

  async getUserData(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  async createUser(payload: Partial<User>): Promise<User> {
    const toCreate = this.filterFields(payload as Record<string, any>)
    if ((payload as Record<string, any>).password) {
      const salt = await genSalt(10)
      toCreate.password = await hash((payload as Record<string, any>).password, salt)
    }
    const user = this.userRepository.create(toCreate)
    return this.userRepository.save(user)
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
