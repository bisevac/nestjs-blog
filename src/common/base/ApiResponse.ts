import { HttpStatus } from '@nestjs/common';

export interface IAPIResponseBase<T> {
  error: boolean;
  message: string;
  statusCode: HttpStatus;
  errorCode: string;
  result: T | any;
  timestamp: string;
}

export class ApiResponse<T> implements IAPIResponseBase<T> {
  public error = false;
  public message = 'OK';
  public statusCode: number = HttpStatus.OK;
  public errorCode: string = null;
  public result: T = null;
  public timestamp = new Date().toISOString();

  constructor(result: T) {
    this.result = result;
  }

  toJSON(): IAPIResponseBase<T> {
    return {
      error: this.error,
      message: this.message,
      statusCode: this.statusCode,
      errorCode: this.errorCode,
      result: this.result,
      timestamp: this.timestamp,
    };
  }
}
