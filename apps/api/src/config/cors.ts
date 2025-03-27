import env from '@/lib/env';

export const ALLOWED_ORIGINS = [env.NEXT_PUBLIC_API_URL];
export const ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'DELETE'];
export const ALLOWED_HEADERS = ['Content-Type', 'Authorization', 'Accept-Language'];
