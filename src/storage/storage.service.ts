import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class StorageService {
  abstract saveFile(buffer: Buffer, ext: string): Promise<string>;
  abstract getFullPath(name: string): string;

  protected generateId(): string {
    return (Math.random() + 1).toString(36).substring(5).toUpperCase();
  }
}
