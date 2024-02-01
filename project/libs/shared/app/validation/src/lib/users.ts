import { ALLOWED_IMG_MIMETYPES, MB } from './const';

export const User = {
  firstname: {
    Min: 3,
    Max: 50,
  },
  password: {
    Min: 6,
    Max: 12,
  },
  avatar: {
    Type: ALLOWED_IMG_MIMETYPES,
    FileMaxSize: 0.5 * MB,
  },
};
