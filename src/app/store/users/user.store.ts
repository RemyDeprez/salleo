import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserStoreService {
  private _current = new BehaviorSubject<User | null>(null);
  readonly current$ = this._current.asObservable();

  constructor() {
    // Seed a dev user when running on localhost to simplify local development
    if (typeof window !== 'undefined') {
      const host = window.location?.hostname || '';
      const isLocal = host === 'localhost' || host === '127.0.0.1' || host === '';
      if (isLocal) {
        this._current.next({
          id: 'dev-user',
          name: 'Utilisateur de test',
          email: 'test@example.com',
          roles: ['admin'],
          plan: 'pro',
        });
      }
    }
  }

  set(user: User | null) {
    this._current.next(user);
  }

  get snapshot(): User | null {
    return this._current.getValue();
  }

  isAdmin(): boolean {
    const u = this.snapshot;
    return !!(u && u.roles && u.roles.includes('admin'));
  }

  isPro(): boolean {
    return this.snapshot?.plan === 'pro';
  }
}
