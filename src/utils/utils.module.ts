import { Global, Module } from '@nestjs/common';
import { CacheKeyGeneratorUtil } from './cache-key-generator.util';
import { DataConverterUtil } from './data-convertor.util';
import { EncryptionUtil } from './encryption.util';
import { GeneratorUtil } from './generator.util';
import { HashFuncUtil } from './hash.util';
import { HttpRequestTransformUtil } from './http-request-transform.util';
import { RetryFuncUtil } from './retry.util';

@Global()
@Module({
  providers: [
    EncryptionUtil,
    RetryFuncUtil,
    GeneratorUtil,
    HashFuncUtil,
    DataConverterUtil,
    HttpRequestTransformUtil,
    CacheKeyGeneratorUtil,
  ],
  exports: [
    EncryptionUtil,
    RetryFuncUtil,
    GeneratorUtil,
    HashFuncUtil,
    DataConverterUtil,
    HttpRequestTransformUtil,
    CacheKeyGeneratorUtil,
  ],
})
export class UtilsModule {}
