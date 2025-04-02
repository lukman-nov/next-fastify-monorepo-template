import type { authClient } from './src/client';
import type { auth } from './src/server';

export type AuthTypes = typeof auth;

export type User = typeof authClient.$Infer.Session.user;
export interface Account {
  id: string;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
  accountId: string;
  scopes: string[];
}
