import { IPaginationOptions } from './pagination.interface';
import { IPaginationResult } from './pagination.results.interface';

export class Pagination<PaginationEntity> {
  public data: PaginationEntity[];
  public total: number;
  public totalPage: number;
  public nextPage: number;
  public prevPage: number;
  public currentPage: number;
  public limit: number;

  constructor(
    paginationResults: IPaginationResult<PaginationEntity>,
    options: IPaginationOptions,
  ) {
    const { page, limit } = options;

    this.data = paginationResults.data;
    this.total = paginationResults.total;
    this.totalPage = Math.ceil(this.total / limit);
    this.nextPage = page + 1 > this.totalPage ? null : page + 1;
    this.prevPage = page - 1 < 1 ? null : page - 1;
    this.currentPage = page;
    this.limit = options.limit;
  }
}
