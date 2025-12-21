import {
  Body,
  Controller,
  Delete,
  Get,
  HostParam,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common'
import type { Request, Response } from 'express'

import { User } from './user.entity'
import { UserService } from './user.service'

@Controller({ path: 'users' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @HttpCode(200)
  async getAllUsers(
    @Res({ passthrough: true }) res: Response,
    @HostParam('account') account: string
  ) {
    const users = await this.userService.getAllUsers()
    return {
      status: 'ok',
      data: users,
      account,
    }
  }

  @Get('/:id')
  async getUser(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const userData = await this.userService.getUserData(id)
    return res.send({
      status: 'ok',
      data: userData,
    })
  }

  @Post('/')
  async createUser(@Req() req: Request, @Res() res: Response) {
    await this.userService.createUser(req.body)
    return res.send({ status: 'ok' })
  }

  @Put('/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<User>,
    @Res() res: Response
  ) {
    const data = await this.userService.updateUserData(id, body)
    return res.send({ status: 'ok', data })
  }

  @Delete('/:id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response
  ) {
    await this.userService.deleteUser(id)
    return res.send({ status: 'ok' })
  }
}
