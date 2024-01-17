import { HttpStatus } from '@nestjs/common';

export const generateSchemeApiError = (message: string, status: number) => {
  const name = HttpStatus[status];
  const errorName = name
    ?.toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        default: message,
      },
      error: {
        type: 'string',
        default: errorName,
      },
      statusCode: {
        type: 'number',
        default: status,
      },
    },
  };
};
