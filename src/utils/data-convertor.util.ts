import { Injectable } from '@nestjs/common';

@Injectable()
export class DataConverterUtil {
  listFilter<ListType, KeyType extends keyof ListType>(
    data: ListType[] = [],
    key: KeyType,
    value: ListType[KeyType],
  ) {
    return data.filter((item) => item[key] === value);
  }

  private flattenObject(ob) {
    const toReturn = {};

    for (const i in ob) {
      if (!ob.hasOwnProperty(i)) continue;

      if (typeof ob[i] == 'object' && ob[i] !== null) {
        const flatObject = this.flattenObject(ob[i]);
        for (const x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) continue;

          toReturn[i + '.' + x] = flatObject[x];
        }
      } else {
        toReturn[i] = ob[i];
      }
    }
    return toReturn;
  }
}
