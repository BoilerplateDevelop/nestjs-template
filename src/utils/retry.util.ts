import { Logger, Injectable } from '@nestjs/common';

interface RetryFuncArg<T> {
  func: () => Promise<T> | T;
  maxRetryCount: number;
  retryDelayTime: number;
  activityName?: string; // for logger
  logger?: Logger;
}

@Injectable()
export class RetryFuncUtil {
  sleep = (delay: number) =>
    new Promise((resolve) => setTimeout(resolve, delay));

  async run<T>({
    func,
    maxRetryCount,
    retryDelayTime,
    activityName,
    logger,
  }: RetryFuncArg<T>): Promise<boolean> {
    let retryCountPoll = 0;
    let success = false;

    const requestRetryPromise = () =>
      new Promise<boolean>(async (res, _) => {
        retryCountPoll++;

        if (logger)
          logger.log(`Start to run ${activityName} - retry ${retryCountPoll}`);
        try {
          await func();
          success = true;
        } catch (error) {
          if (logger)
            logger.error(
              `Failed to run ${activityName} - retry ${retryCountPoll}`,
            );

          if (retryCountPoll < maxRetryCount) {
            await this.sleep(retryDelayTime);

            res(requestRetryPromise());
          }
        }

        if (logger) {
          logger.log(`Finish to run ${activityName}`);
        }

        res(success);
      });

    return requestRetryPromise();
  }
}
