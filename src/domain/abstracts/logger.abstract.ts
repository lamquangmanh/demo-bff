export abstract class LoggerAbstract {
  abstract context?: string;
  static lastTimestampAt?;
  abstract originalContext?;

  abstract setRequestId(requestId: string);
  /**
   * Write a 'log' level log, if the configured level allows for it.
   * Prints to `stdout` with newline.
   */
  abstract log(message: any, userId?: string, context?: string): void;
  /**
   * Write an 'error' level log, if the configured level allows for it.
   * Prints to `stderr` with newline.
   */
  abstract error(message: any, userId?: string, stackOrContext?: string): void;
  abstract error(message: any, userId?: string, stack?: string, context?: string): void;
  /**
   * Write a 'warn' level log, if the configured level allows for it.
   * Prints to `stdout` with newline.
   */
  abstract warn(message: any, userId?: string, context?: string): void;
  /**
   * Write a 'debug' level log, if the configured level allows for it.
   * Prints to `stdout` with newline.
   */
  abstract debug(message: any, userId?: string, context?: string): void;
  /**
   * Write a 'verbose' level log, if the configured level allows for it.
   * Prints to `stdout` with newline.
   */
  abstract verbose(message: any, userId?: string, context?: string): void;
  /**
   * Write a 'fatal' level log, if the configured level allows for it.
   * Prints to `stdout` with newline.
   */
  abstract fatal(message: any, userId?: string, context?: string): void;
  /**
   * Set log levels
   * @param levels log levels
   */
  /**
   * Set logger context
   * @param context context
   */
  abstract setContext(context: string): void;
  /**
   * Resets the logger context to the value that was passed in the constructor.
   */
  abstract resetContext(): void;
  abstract getTimestamp(): string;

  abstract formatPid(pid: number): string;
  abstract formatContext(context: string): string;
  abstract printStackTrace(stack: string): void;
  abstract updateAndGetTimestampDiff(): string;
  abstract formatTimestampDiff(timestampDiff: number): string;
  abstract getContextAndMessagesToPrint;
  abstract getContextAndStackAndMessagesToPrint;
  abstract isStackFormat;
  abstract getColorByLogLevel;
}
