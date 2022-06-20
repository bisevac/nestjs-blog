import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { LocalStorageService } from '../storage/local.storage.service';
import { Pagination, PaginationQueryDTO } from '../common/paginate';
import {
  BlogAddRequestDTO,
  BlogAddResponseDTO,
  BlogUpdateRequestDTO,
} from './blog.dto';
import { BlogService } from './blog.service';
import { Blog } from './entities/blog.entity';
import { extname } from 'path';
import { fileFilter } from '../common/helpers/Multer';
import { IpAddress } from '../common/decorators/ip.decarators';
import { ApiResponse } from '../common/base/ApiResponse';

@Controller('blog')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly storageService: LocalStorageService,
  ) {}

  @Get('/')
  async get(
    @Query() query: PaginationQueryDTO,
  ): Promise<ApiResponse<Pagination<Blog>>> {
    const r = await this.blogService.paginate({
      limit: +query.limit || 10,
      page: +query.page || 1,
    });

    return new ApiResponse(r);
  }

  @Post('/')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: fileFilter({
        mime: ['image/jpg', 'image/png', 'image/jpeg'],
      }),
      limits: { fileSize: 1024 * 1024 * 5 },
    }),
  )
  async add(
    @Body() blog: BlogAddRequestDTO,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<ApiResponse<BlogAddResponseDTO>> {
    const imagePath = await this.storageService.saveFile(
      image.buffer,
      extname(image.originalname),
    );

    const generatedMap = await this.blogService.create({
      image: imagePath,
      ...blog,
    });

    return new ApiResponse({
      id: generatedMap.id,
      atCreated: generatedMap.atCreated,
    });
  }

  @Get('/:id')
  async detail(
    @Param('id') id: number,
    @IpAddress() clientIpAddress: string,
  ): Promise<ApiResponse<Blog>> {
    const blog = await this.blogService.findById(id);

    if (!blog)
      throw new HttpException('Content not found', HttpStatus.NOT_FOUND);

    this.blogService
      .viewBlog(id, clientIpAddress)
      .catch((e) => console.error(e));

    blog.image = this.storageService.getFullPath(blog.image);

    return new ApiResponse(blog);
  }

  @Put('/')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: fileFilter({
        mime: ['image/jpg', 'image/png', 'image/jpeg'],
      }),
      limits: { fileSize: 1024 * 1024 * 5 },
    }),
  )
  async update(
    @Body() blog: BlogUpdateRequestDTO,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<ApiResponse<boolean>> {
    const imagePath = await this.storageService.saveFile(
      image.buffer,
      extname(image.originalname),
    );

    const r = await this.blogService.update(blog.id, {
      image: imagePath,
      ...blog,
    });

    return new ApiResponse(r);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<ApiResponse<boolean>> {
    const r = await this.blogService.delete(id);

    return new ApiResponse(r);
  }
}
