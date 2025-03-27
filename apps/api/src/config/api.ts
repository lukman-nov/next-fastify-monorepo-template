import env from '@/lib/env';

type Level = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';
export const LOG_LEVEL: Level = 'info';
export const IS_DEV = env.NODE_ENV === 'development';
