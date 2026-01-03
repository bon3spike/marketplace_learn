import { Injectable } from '@nestjs/common'
import { Redis } from 'ioredis'

@Injectable()
export class RedisService {
  constructor(private readonly redis: Redis) {}

  async set(key: string, data: { [k: string]: any }, expire?: number) {
    if (expire !== undefined) {
      return this.redis.set(key, JSON.stringify(data), 'EX', expire)
    }
    return this.redis.set(key, JSON.stringify(data))
  }

  async get(key: string){
    const data = await this.redis.get(key)
    return data ? JSON.parse(data) : null
  }

  async del(key: string){
    return await this.redis.del(key)
  }
}
