import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import * as _ from 'lodash';
import { Observable, map, of } from 'rxjs';
import { CacheService } from 'src/modules/cache/cache.service';
import { CacheKeyGeneratorUtil } from 'src/utils/cache-key-generator.util';

/**
 * Set Cache TTL
 */
@Injectable()
export class CustomCacheSetTTLInterceptor implements NestInterceptor {
  constructor(private readonly ttl: number) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    if (this.ttl > 0) {
      request.cacheTTL = this.ttl;
    }

    return next.handle();
  }
}

/**
 * GET & SET interceptor
 */
@Injectable()
export class CustomCacheInterceptor implements NestInterceptor {
  constructor(
    private readonly cacheService: CacheService,
    private cacheKeyGeneratorUtil: CacheKeyGeneratorUtil,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const isEnglish = request.headers.language !== 'tc';

    const pathname = request.originalUrl;
    const query = request.query;
    const body = request.body;
    const language = isEnglish ? 'en' : 'tc';

    const cacheKey = this.cacheKeyGeneratorUtil.generate(pathname, {
      query,
      body,
      language,
    });

    const cachedValue = await this.cacheService.get(cacheKey);

    /**
     * check data exist in redis before passing handler and response return if exist
     */

    if (cachedValue) {
      return of(cachedValue);
    }
    /**
     * if cache data not exist, go to handler
     * after handler and pipe to control the response store the response data in redis using pipe
     */
    return next.handle().pipe(
      map((data) => {
        if (request.cacheTTL) {
          this.cacheService.set(cacheKey, data, request.cacheTTL);
        } else {
          this.cacheService.set(cacheKey, data);
        }
        return data;
      }),
    );
  }
}

/**
 * choose the key pattern
 */
@Injectable()
export class CustomCacheSetPatternInterceptor implements NestInterceptor {
  constructor(
    private readonly pattern?: {
      prefix?: string;
      regex?: RegExp;
    },
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    request.cachePattern = this.pattern;

    return next.handle();
  }
}

/**
 * DELETE interceptor by pattern
 */
@Injectable()
export class CustomCacheDeleteInterceptor implements NestInterceptor {
  constructor(private readonly cacheService: CacheService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) => {
        if (request.cachePattern.prefix) {
          this.cacheService.deletedByPrefix(request.cachePattern.prefix);
        }

        if (request.cachePattern.regex) {
          this.cacheService.deletedByRegex(request.cachePattern.regex);
        }

        return data;
      }),
    );
  }
}
