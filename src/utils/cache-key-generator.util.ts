import { Injectable } from '@nestjs/common';
/**
 * eg.
 * input
 * {
 *  skip:1,
 *  take:10,
 *  orderBy:"createdAt",
 *  id:1
 * }
 *
 * output
 * "id=1&orderBy=createdAt&skip=1&take=10"
 */

export type Option = {
  query?: Record<string, string>;
  body?: Record<string, string>;
  language?: 'en' | 'tc';
};

@Injectable()
export class CacheKeyGeneratorUtil {
  generate(pathname: string, option: Option) {
    let query = this.unorderObjectToOrderString(option.query);
    let body = this.unorderObjectToOrderString(option.body);
    const language = option.language ? `#${option.language}` : '';

    query = query ? `?${query}` : '';
    body = body ? `//${body}` : '';

    return pathname + query + body + language;
  }

  private unorderObjectToOrderString(obj) {
    return JSON.stringify(
      Object.entries(obj)
        .sort(([key1, value1], [key2, value2]) => key1.localeCompare(key2))
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {}),
    );
  }
}
