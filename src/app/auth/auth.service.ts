import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map, from, switchMap } from 'rxjs';
import { hashPassword } from '../utils/password.util';
import { apiUrl } from '../config/api.config';

interface LoginPayload {
  email: string;
  password?: string;
  passwordHash?: string;
  clientHashed?: boolean;
}

interface RegisterPayload {
  username: string;
  email: string;
  password?: string;
  passwordHash?: string;
  clientHashed?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'salleo_token';

  constructor(private readonly http: HttpClient) {}

  login(payload: LoginPayload): Observable<{ token: string }> {
    // If caller already provided a client-side hash, use it directly
    if (payload.clientHashed && payload.passwordHash) {
      return this.http
        .post<{ token: string }>(apiUrl('/api/auth/login'), {
          email: payload.email,
          passwordHash: payload.passwordHash,
          clientHashed: true,
        })
        .pipe(
          map((r) => {
            if (!r.token) throw new Error('Le serveur a répondu sans token');
            return r;
          }),
          tap((r) => this.setToken(r.token))
        );
    }

    // Otherwise expect a plaintext password and hash it here
    if (payload.password) {
      return from(hashPassword(payload.password)).pipe(
        switchMap((passwordHash) =>
          this.http.post<{ token: string }>(apiUrl('/api/auth/login'), {
            email: payload.email,
            passwordHash,
            clientHashed: true,
          })
        ),
        map((r) => {
          if (!r.token) throw new Error('Le serveur a répondu sans token');
          return r;
        }),
        tap((r) => this.setToken(r.token))
      );
    }

    throw new Error('Login payload must include a plaintext password or a client-hashed password');
  }

  register(payload: RegisterPayload): Observable<any> {
    // If caller already hashed the password in the client, forward it as-is
    if (payload.clientHashed && payload.passwordHash) {
      return this.http.post(apiUrl('/api/auth/register'), {
        username: payload.username,
        email: payload.email,
        passwordHash: payload.passwordHash,
        clientHashed: true,
      });
    }

    // Otherwise hash the plaintext password then send
    if (payload.password) {
      return from(hashPassword(payload.password)).pipe(
        switchMap((passwordHash) =>
          this.http.post(apiUrl('/api/auth/register'), {
            username: payload.username,
            email: payload.email,
            passwordHash,
            clientHashed: true,
          })
        )
      );
    }

    throw new Error(
      'Register payload must include a plaintext password or a client-hashed password'
    );
  }

  logout(): void {
    if (globalThis.window?.sessionStorage) {
      sessionStorage.removeItem(this.TOKEN_KEY);
    }
  }

  setToken(token: string) {
    // store in sessionStorage to reduce persistence risk across devices
    if (globalThis.window?.sessionStorage) {
      sessionStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  getToken(): string | null {
    if (!globalThis.window?.sessionStorage) return null;
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
