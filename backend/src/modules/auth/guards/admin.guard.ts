import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { TRequestWithUser } from '../auth.interface';
import { Role } from 'prisma/generated/prisma/client';
import { ForbiddenError } from '@nestjs/apollo';
import { FORBIDDEN_ERROR } from '../auth.constants';

export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);

    const user = ctx.getContext<{ req: TRequestWithUser }>().req.user;

    if (user.role === Role.ADMIN) throw new ForbiddenError(FORBIDDEN_ERROR);

    return true;
  }
}
