import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogService } from './blog.service';
import { BlogView } from './entities/blog-view.entity';
import { Blog } from './entities/blog.entity';

describe('BlogService', () => {
  let service: BlogService;
  const id = Math.floor(Math.random() * 10000);

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            type: 'mysql',
            host: configService.get('DB_HOST'),
            port: +configService.get('DB_PORT'),
            username: configService.get('DB_USER'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_TEST_DATABASE'),
            entities: [Blog, BlogView],
            synchronize: configService.get('DB_SYNCRONIZE') === 'true',
            logging: false,
          }),
          inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([Blog, BlogView]),
      ],
      providers: [BlogService],
    }).compile();

    service = module.get<BlogService>(BlogService);
  });

  it('Blog Create', async () => {
    const blog = new Blog();
    blog.id = id;
    blog.title = 'Sed eu quam pretium diam feugiat faucibus.';
    blog.shortContent = 'ullam venenatis, orci eget efficitur iaculis, justo';
    blog.content = 'Mauris accumsan eros et enim tempus efficitur';
    blog.image = '/images/8Z2AY4.png';

    const generatedMap = await service.create(blog);

    expect(generatedMap).toHaveProperty('id');
  });

  it('Blog Update', async () => {
    const r = await service.update(id, {
      title: 'Suspendisse sed ipsum dui.',
      image: '/images/8Z2AY4.png',
    });

    expect(r).toBe(true);
  });

  it('Blog Detail', async () => {
    const blog = await service.findById(id);

    expect(blog).toHaveProperty('id');
    expect(blog).toHaveProperty('title');
    expect(blog).toHaveProperty('totalViewCount');
    expect(blog).toHaveProperty('atCreated');
  });

  it('Blog Pagination', async () => {
    const blog = await service.paginate({ limit: 10, page: 1 });

    expect(blog).toHaveProperty('data');
    expect(blog.data).toBeInstanceOf(Array);
    expect(blog.data.length).toBeGreaterThan(0);
  });

  it('Blog Delete', async () => {
    const r = await service.delete(id);
    expect(r).toBe(true);

    const deleted = await service.findById(id);
    expect(deleted).toBe(null);
  });
});
