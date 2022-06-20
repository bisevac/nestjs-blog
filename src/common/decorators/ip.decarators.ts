import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const IpAddress = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    return (
      req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip
    );
  },
);
