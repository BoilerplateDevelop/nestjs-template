import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  generateResponse,
  EStatus,
  GenericResponseInterface,
} from '../generic.response';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, GenericResponseInterface>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<GenericResponseInterface> {
    return next
      .handle()
      .pipe(map((data) => generateResponse(EStatus.SUCCESS, data)));
  }
}
