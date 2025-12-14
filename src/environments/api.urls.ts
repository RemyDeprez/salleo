// API base URLs for different environments. Edit these values to match your
// test and production endpoints.

export const API_URLS: Record<string, string> = {
  development: 'http://localhost:8080',
  test: 'https://api-test.example.com',
  production: 'https://api.example.com',
};

export type ApiEnv = 'development' | 'test' | 'production';
