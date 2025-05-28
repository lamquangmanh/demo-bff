/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggerInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isGraphql = context.getType<string>() === 'graphql';

    const now = Date.now();
    const logData = {
      time: new Date().toISOString(),
      elapsed: 0,
      type: context.getType(),
      request: {},
      response: {},
      error: {},
    };

    if (isGraphql) {
      const gqlContext = GqlExecutionContext.create(context);
      const info = gqlContext.getInfo();
      const args = gqlContext.getArgs();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const parentType = info.parentType?.name;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const fieldName = info.fieldName;
      logData.request = {
        info,
        args,
        parentType,
        fieldName,
      };
    }

    return next.handle().pipe(
      tap((data: any) => {
        logData.elapsed = Date.now() - now;
        logData.response = data;
        this.logger.log(
          `${logData.time} - ${logData.elapsed}ms - ${JSON.stringify(logData)}`,
        );
      }),
      catchError((err: any) => {
        logData.elapsed = Date.now() - now;
        logData.error = err;
        this.logger.error(
          `${logData.time} - ${logData.elapsed}ms - ${JSON.stringify(logData)}`,
        );
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return throwError(() => err);
      }),
    );
  }
}
