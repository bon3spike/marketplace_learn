import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HostParam,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common'

import { User } from './user.entity'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/updateUser.dto'
import { LoginUserDto } from './dto/loginUser.dto'
import { RegisterUserDto } from './dto/registerUser.dto'
import { compare } from 'bcrypt'

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/users')
  @HttpCode(HttpStatus.OK)
  async getAllUsers() {
    const users = await this.userService.getAllUsers()
    return { status: 'ok', data: users }
  }

  @Get('/users/:id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const userData = await this.userService.getUserById(id)
    return { status: 'ok', data: userData }
  }

  @Post('/users')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() body: RegisterUserDto) {
    const user = await this.userService.createUser(body)
    return { status: 'ok', data: user }
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginUserDto) {
    const { loginOrEmail, password } = body

    const foundUser = await this.userService.getUserByLoginOrEmail(loginOrEmail)

    if (!foundUser) {
      throw new ForbiddenException()
    }

    const isPasswordValid = await compare(password, foundUser.password)

    if (!isPasswordValid) throw new ForbiddenException()

    return { status: 'ok', data: null }
  }

  @Post('/register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() body: RegisterUserDto) {
    await this.userService.createUser(body)
    return { status: 'ok', data: null }
  }

  @Put('/users/:id')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto
  ) {
    const data = await this.userService.updateUserData(id, body)
    return { status: 'ok', data }
  }

  @Delete('/users/:id')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id)
    return { status: 'ok', data: null }
  }
}
