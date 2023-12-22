import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseResource, Resource } from '../base-class/base.resource';
import { circularToJSON } from '../helper';

type Meta = {
  currentRecordCount: number;
  totalRecordCount: number;
  totalPage: number;
  currentPage: number;
  perPage: number;
  startOf: number;
};

@Injectable()
export class ResponsePaginationInterceptor<T>
implements NestInterceptor<T, any> {
  offset;
  queryString = '';
  pathname = null;
  query = null;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    this.query = request.query;

    return next.handle().pipe(
      map((resp) => {
        const { count, rows, ...additionalMeta } = circularToJSON(resp);
        this.queryString = request._parsedUrl.query || '';
        this.pathname = request._parsedUrl.pathname;
        const meta = this.meta(count, rows, additionalMeta);

        return { 
          message: 'Success',
          statusCode: context.switchToHttp().getResponse().statusCode.toString() || '200',
          meta, 
          links: this.links(meta), 
          data : rows 
        };
      }),
    );
  }

  private links({ currentPage, totalPage }: Meta) {
    const self = () => this.linkQueries(currentPage);
    const prev = () => {
      const prevPage = +currentPage - 1;
      if (prevPage < 1) return undefined;

      return this.linkQueries(prevPage);
    };
    const next = () => {
      if (+currentPage >= +totalPage) return undefined;

      return this.linkQueries(+currentPage + 1);
    };

    const last = () => {
      if (!+totalPage) return undefined;
      return this.linkQueries(totalPage);
    };

    return {
      self: self(),
      prev: prev(),
      next: next(),
      last: last(),
    };
  }

  private linkQueries(itsPage: number): string {
    const updatedQuery = this.queryString.replace(
      `page=${this.query.page}`,
      `page=${itsPage}`,
    );

    if (!updatedQuery) return this.pathname;
    return `${this.pathname}?${updatedQuery}`;
  }

  private meta(count, rows: any[], additionalMeta: any): Meta {
    const total: number = typeof count === 'object' ? count?.length || 0 : count;
    const totalPage = Math.ceil(total / (+this.query.size || undefined));
    const offset = this.query.size * this.query.page - +this.query.size || 0;

    return (
      (total >= 0 && {
        totalRecordCount: total,
        currentRecordCount: rows?.length || 0,
        totalPage: totalPage || 0,
        currentPage: +additionalMeta?.meta?.page || +this.query.page || 1,
        perPage: +this.query.size || 0,
        startOf: (count && offset + 1) || 0,
        ...additionalMeta,
      })
      || undefined
    );
  }
}
