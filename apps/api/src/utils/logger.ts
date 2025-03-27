import { IS_DEV, LOG_LEVEL } from '@/config';

export default function getLoggerOptions() {
  if (IS_DEV) {
    return {
      level: LOG_LEVEL,
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    };
  }

  return { level: LOG_LEVEL };
}
