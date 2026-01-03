import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { RedisService } from '../redis/redis.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly redisService: RedisService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET ?? 'ggg',
    })
  }

  async validate(payload: any) {
    const userId = payload?.userId
    if (!userId) throw new UnauthorizedException()
    const sessionData = await this.redisService.get(`user:${userId}`)
    if (!sessionData) {
      throw new UnauthorizedException()
    }
    return sessionData
  }
}
