import { Injectable, Scope } from '@nestjs/common';
import { AuthenticatedUser } from '../types/authenticated-user';

@Injectable({ scope: Scope.REQUEST })
export class CurrentUserService {
  private user: AuthenticatedUser | null = null;

  setUser(user: AuthenticatedUser) {
    this.user = user;
  }

  getUser(): AuthenticatedUser {
    if (!this.user) {
      throw new Error('User not set in CurrentUserService');
    }
    
    return this.user;
  }

  getUserId(): string {
    return this.getUser().userId;
  }

  getEmail(): string {
    return this.getUser().email;
  }
}
