import * as crypto from 'crypto';

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

export class GeneratorUtil {
  genreateUuid() {
    return crypto.randomUUID();
  }

  generateRandomString(l = 8) {
    const length = l;
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let retVal = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  generateCacheKey(pathname: string, option: Option) {
    let query = this.unorderObjectToOrderString(option.query);
    let body = this.unorderObjectToOrderString(option.body);
    const language = option.language ? `#${option.language}` : '';

    query = query ? `?${query}` : '';
    body = body ? `//${body}` : '';

    return pathname + query + body + language;
  }

  private unorderObjectToOrderString(obj) {
    const sortedObj = JSON.stringify(
      Object.entries(obj)
        .sort(([key1, value1], [key2, value2]) => key1.localeCompare(key2))
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {}),
    );
    return sortedObj;
  }
}
