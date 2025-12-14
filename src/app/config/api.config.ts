// Central API configuration
// This file maps an environment name to an API base URL using the
// `src/environments/api.urls.ts` table. Behavior:
// - If `API_BASE_ENV` is set, it takes highest priority and is used as the base.
// - If `API_ENV` or `NODE_ENV` is set it selects that environment's URL.
// - Otherwise, when running the dev server in the browser we default to
//   `development` (http://localhost:8080). This satisfies the request that
//   while developing locally the frontend (4200) calls the backend on 8080.

import { API_URLS, ApiEnv } from '../../environments/api.urls';

function ensureLeadingSlash(path: string) {
  return path.startsWith('/') ? path : `/${path}`;
}

function resolveEnv(): ApiEnv {
  // explicit override via API_ENV
  const apiEnv = typeof process !== 'undefined' && (process as any).env?.API_ENV;
  if (apiEnv === 'test' || apiEnv === 'production' || apiEnv === 'development') return apiEnv;

  // fallback to NODE_ENV
  const nodeEnv = typeof process !== 'undefined' && (process as any).env?.NODE_ENV;
  if (nodeEnv === 'production') return 'production';

  // in browser, default to development for local dev (front on 4200, API on 8080)
  const w = (globalThis as any).window as Window | undefined;
  if (w) return 'development';

  // default server-side
  return 'production';
}

export function apiBase(): string {
  // runtime override
  const runtime = typeof process !== 'undefined' && (process as any).env?.API_BASE_ENV;
  if (runtime && typeof runtime === 'string') return runtime;

  const env = resolveEnv();
  return API_URLS[env];
}

export function apiUrl(path: string) {
  const base = apiBase();
  const p = ensureLeadingSlash(path);
  return `${base}${p}`;
}
