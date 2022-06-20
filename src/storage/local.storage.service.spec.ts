import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { LocalStorageService } from './local.storage.service';
import { existsSync } from 'fs';
import { resolve } from 'path';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  const basePath = resolve(__dirname, '../../bucket');
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [LocalStorageService, ConfigService],
    }).compile();

    service = module.get<LocalStorageService>(LocalStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('save file', async () => {
    const buffer = Buffer.from('test');

    const name = await service.saveFile(buffer, '.jpeg');
    expect(name).toMatch(/.+\.jpeg/);

    const exists = existsSync(`${basePath}/${name}`);
    expect(exists).toBe(true);
  });

  it('get full path', async () => {
    const fullPath = await service.getFullPath('test.png');
    const domain = module.get(ConfigService).get('DOMAIN');

    expect(fullPath).toBe(`${domain}/test.png`);
  });
});
