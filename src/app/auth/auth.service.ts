import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of, map } from 'rxjs';

interface LoginPayload {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'salleo_token';

  constructor(private http: HttpClient) {}

  login(payload: LoginPayload): Observable<{ token: string }> {
    // In local development, allow a dev credential to skip the API.
    if (typeof window !== 'undefined') {
      const host = window.location?.hostname || '';
      const isLocal = host === 'localhost' || host === '127.0.0.1' || host === '';
      const DEV_EMAIL = 'test@example.com';
      const DEV_PASSWORD = 'password';
      if (isLocal && payload.email === DEV_EMAIL && payload.password === DEV_PASSWORD) {
        const token = 'dev-token';
        this.setToken(token);
        return of({ token }).pipe(tap(() => this.setToken(token)));
      }
    }

    return this.http.post<{ token: string }>('/api/auth/login', payload).pipe(
      map((r) => {
        if (!r || !r.token) {
          throw new Error('Le serveur a répondu sans token');
        }
        return r;
      }),
      tap((r) => this.setToken(r.token))
    );
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.removeItem(this.TOKEN_KEY);
    }
  }

  setToken(token: string) {
    // store in sessionStorage to reduce persistence risk across devices
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  getToken(): string | null {
    if (typeof window === 'undefined' || !window.sessionStorage) return null;
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    try {
      const t = this.getToken();
      return !!t;
    } catch {
      return false;
    }
  }
}
