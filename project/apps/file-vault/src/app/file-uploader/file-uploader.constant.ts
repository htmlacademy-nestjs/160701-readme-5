export const MB = 1024 * 1024;
export const ALLOWED_MIMETYPES = ['jpeg', 'jpg', 'png'];
export const FileMaxSize = {
  Avatar: 0.5 * MB,
  PostPhoto: 1 * MB,
} as const;
