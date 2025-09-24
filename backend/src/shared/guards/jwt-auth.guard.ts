import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUserService } from 'src/shared/services/current-user.service';
import { Request } from 'express';
import { AuthenticatedUser } from 'src/shared/types/authenticated-user';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly currentUserService: CurrentUserService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const result = super.canActivate(context) as boolean | Promise<boolean>;

    if (result instanceof Promise) {
      return result.then((allowed) => {
        if (allowed) {
          this.setCurrentUser(context);
        }

        return allowed;
      });
    }

    if (result) {
      this.setCurrentUser(context);
    }

    return result;
  }

  private setCurrentUser(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as AuthenticatedUser | undefined;

    if (user) {
      this.currentUserService.setUser(user);
    }
  }
}