import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';

@Injectable()
export class EncryptionUtil {
  key: crypto.CipherKey;
  encryptionIV: crypto.BinaryLike;

  constructor(private configService: ConfigService) {
    this.key = crypto
      .createHash('sha512')
      .update(this.configService.get('ENCRYPTION_SECRET_KEY'))
      .digest('hex')
      .substring(0, 32);

    this.encryptionIV = crypto
      .createHash('sha512')
      .update(this.configService.get('ENCRYPTION_SECRET_IV'))
      .digest('hex')
      .substring(0, 16);
  }

  // Encrypt data
  public encryptData<T>(data: T, expiryTime: number) {
    const strPayload = JSON.stringify({
      payload: data,
      exp: moment().add(expiryTime, 'seconds').toDate(),
    });

    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      this.key,
      this.encryptionIV,
    );
    return Buffer.from(
      cipher.update(strPayload, 'utf8', 'hex') + cipher.final('hex'),
    ).toString('base64'); // Encrypts data and converts to hex and base64
  }

  // Decrypt data
  public decryptData<T>(encryptedData: string): { exp: Date; payload: T } {
    const buff = Buffer.from(encryptedData, 'base64');
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      this.key,
      this.encryptionIV,
    );
    const result =
      decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
      decipher.final('utf8'); // Decrypts data and converts to utf8

    return JSON.parse(result);
  }
}
