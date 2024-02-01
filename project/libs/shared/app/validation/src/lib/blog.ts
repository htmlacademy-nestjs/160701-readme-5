import { ALLOWED_IMG_MIMETYPES, MB } from './const';

export const Post = {
  tags: {
    MinLength: 3,
    MaxLength: 10,
    MaxSize: 8,
    Matches: /^[a-zA-Zа-яА-Я][a-zA-Z0-9_#]{2,9}$/,
  },
};

export const PostContentValidator = {
  photo: {
    file: {
      Type: ALLOWED_IMG_MIMETYPES,
      FileMaxSize: 1 * MB,
    },
  },
  video: {
    title: {
      Min: 20,
      Max: 50,
    },
    url: {
      Matches: /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]+(&\S*)?$/,
    },
  },
  text: {
    title: {
      Min: 20,
      Max: 50,
    },
    annotation: {
      Min: 50,
      Max: 255,
    },
    content: {
      Min: 100,
      Max: 1024,
    },
  },
  quote: {
    quote: {
      Min: 20,
      Max: 300,
    },
    author: {
      Min: 3,
      Max: 50,
    },
  },
  link: {
    description: {
      Min: 0,
      Max: 300,
    },
  },
};

export const CommentValidator = {
  message: {
    Min: 10,
    Max: 300,
  },
};
