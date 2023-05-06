export class HttpRequestTransformUtil {
  transformQueryStringToArray(originalObj = {}): {
    [key: string]: string[];
  } {
    const newObj = {};
    for (const key in originalObj) {
      if (Array.isArray(originalObj[key])) {
        newObj[key] = originalObj[key];
      } else {
        newObj[key] = originalObj[key].split(',');
      }
    }
    return newObj;
  }
}
