import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { StorageModule } from '../storage/storage.module';
import { BlogView } from './entities/blog-view.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, BlogView]), StorageModule],
  providers: [BlogService],
  controllers: [BlogController],
  exports: [],
})
export class BlogModule {}
