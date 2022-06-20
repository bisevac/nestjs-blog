import { promises as fs } from 'fs';
import { resolve } from 'path';
import { Injectable } from '@nestjs/common';
import { StorageService } from './storage.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LocalStorageService extends StorageService {
  private basePath = resolve(__dirname, '../../bucket');
  private prefix = 'images';
  private domain;

  constructor(private configService: ConfigService) {
    super();
    this.domain = this.configService.get('DOMAIN');
  }

  async saveFile(buffer: Buffer, ext: string): Promise<string> {
    const id = this.generateId();
    const name = `${id}${ext}`;
    const path = `${this.basePath}/${this.prefix}/${name}`;

    await fs.writeFile(path, buffer);

    return `${this.prefix}/${name}`;
  }

  getFullPath(name: string): string {
    return `${this.domain}/${name}`;
  }
}
