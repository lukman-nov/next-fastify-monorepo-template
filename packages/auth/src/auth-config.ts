export const APP_NAME: string = 'ZeroX Project';

export const AUTH_COOKIE = '@zx.session_token';

export const SESSION = {
  EXPIRES_IN: 60 * 60 * 24 * 7, // 7 days
  UPDATE_AGE: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
};

export const USERNAME = {
  MIN_LENGTH: 4,
  MAX_LENGTH: 50,
};
