import {RedisService} from '../redis/redis.service'
import { Injectable } from '@nestjs/common'
import { JwtService as NestJwtService } from '@nestjs/jwt'

@Injectable()
export class JwtService {
  constructor(
    private readonly redisService: RedisService,
    private readonly jwtService: NestJwtService
  ) {}

  async setSession(payload: any) {
    const jwt = this.jwtService.sign(payload)
    const userId = payload?.userId
    if (!userId) {
      throw new Error('userId is required to create a session')
    }
    await this.redisService.set(`user:${userId}`, payload, Number(process.env.JWT_EXPIRE))

    return jwt
  }

  async deleteSession(jwt: string) {
    await this.redisService.del(jwt)
  }
}
