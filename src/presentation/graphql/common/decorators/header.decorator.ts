import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const Header = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx: any = GqlExecutionContext.create(context);
  const { req } = ctx.getContext();
  return req?.headers;
});
