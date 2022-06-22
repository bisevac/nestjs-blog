import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination, IPaginationOptions } from '../common/paginate';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { AObject } from '../common/helpers/AObject';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BlogView } from './entities/blog-view.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
    @InjectRepository(BlogView)
    private blogViewRepository: Repository<BlogView>,
  ) {}

  async create(blog: QueryDeepPartialEntity<Blog>): Promise<AObject> {
    const r = await this.blogRepository.insert(blog);

    return r.generatedMaps[0];
  }

  findById(id: number): Promise<Blog> {
    return this.blogRepository.findOneBy({ id });
  }

  async update(
    id: number,
    blog: QueryDeepPartialEntity<Blog>,
  ): Promise<boolean> {
    const r = await this.blogRepository.update(id, blog);

    return !!r.affected;
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Blog>> {
    const [data, total] = await this.blogRepository.findAndCount({
      select: ['id', 'title', 'shortContent'],
      take: options.limit,
      skip: (options.page - 1) * options.limit,
    });

    return new Pagination<Blog>({ data, total }, options);
  }

  async delete(id: number): Promise<boolean> {
    const r = await this.blogRepository.softDelete({ id });

    return !!r.affected;
  }

  async viewBlog(id: number, ip: string): Promise<void> {
    const exists = await this.blogViewRepository.findOneBy({ ip, blogId: id });

    if (exists) {
      await this.blogViewRepository.update(
        { id: exists.id },
        { viewCount: () => 'viewCount + 1' },
      );

      await this.blogRepository.update(
        { id },
        { totalViewCount: () => 'totalViewCount + 1' },
      );

      return;
    }

    await this.blogViewRepository.insert({ blogId: id, ip });
    await this.blogRepository.update(
      { id: id },
      {
        uniqueViewCount: () => 'uniqueViewCount + 1',
        totalViewCount: () => 'totalViewCount + 1',
      },
    );
  }
}
