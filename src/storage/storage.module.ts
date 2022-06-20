import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LocalStorageService } from './local.storage.service';

@Module({
  controllers: [],
  providers: [LocalStorageService, ConfigService],
  exports: [LocalStorageService],
})
export class StorageModule {}
