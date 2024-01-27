export enum ApplicationServiceURL {
  Users = 'http://localhost:3333/api/v1/auth',
  Blog = 'http://localhost:3666/api/v1/posts',
  FileVault = 'http://localhost:3555/api/v1/files',
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 5000;
