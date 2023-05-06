import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class InMemoryCacheService {
  private client;

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {
    this.client = cacheManager.store;
  }

  async get(key: string) {
    return await this.client.get(key);
  }

  async set(key: string, value: any, ttl = 3600) {
    // default 1 hour to expire
    await this.client.set(key, value, ttl);
  }

  async reset() {
    await this.client.reset();
  }

  async del(key: string) {
    await this.client.del(key);
  }

  async bulkDelete(keys: string[]) {
    return await Promise.all(
      keys.map((key) => {
        this.client.del(key);
      }),
    );
  }

  async getAllKey() {
    return await this.client.keys();
  }

  async keys(option?: { prefix?: string; regex?: RegExp }): Promise<string[]> {
    const keys = await this.client.keys();

    if (option.prefix)
      return keys.filter((key: string) => key.startsWith(option.prefix));
    if (option.regex)
      return keys.filter((key: string) => option.regex.test(key));

    return keys;
  }

  async deleteAll() {
    const keys = await this.keys();
    return await this.bulkDelete(keys);
  }

  async deletedByPrefix(prefix: string) {
    const keys = await this.keys({ prefix });
    return await this.bulkDelete(keys);
  }

  async deletedByRegex(regex: RegExp) {
    const keys = await this.keys({ regex });
    return await this.bulkDelete(keys);
  }
}
