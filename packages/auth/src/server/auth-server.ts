import type { BetterAuthOptions } from 'better-auth';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { bearer, username } from 'better-auth/plugins';

import type { Roles } from '@zx/db';
import { prisma } from '@zx/db';
import { sendDeleteAccountEmail, sendForgetPasswordEmail, sendVerificationEmail } from '@zx/email';

import { APP_NAME, AUTH_COOKIE, AUTH_COOKIE_PREFIX, SESSION, USERNAME } from '../auth-config';
import { env } from '../lib';
import { compare, hashed } from '../lib/utils';

const authServer = {
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  appName: APP_NAME,
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.NEXT_PUBLIC_API_URL.replace('/api', ''),
  trustedOrigins: [env.NEXT_PUBLIC_APP_URL],
  basePath: `v1/auth`,
  session: {
    expiresIn: SESSION.EXPIRES_IN,
    updateAge: SESSION.UPDATE_AGE,
  },
  advanced: {
    generateId: false,
    cookiePrefix: AUTH_COOKIE_PREFIX,
    cookies: {
      session_token: {
        name: AUTH_COOKIE,
      },
    },
  },
  plugins: [
    bearer(),
    nextCookies(),
    username({
      minUsernameLength: USERNAME.MIN_LENGTH,
      maxUsernameLength: USERNAME.MAX_LENGTH,
    }),
  ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    resetPasswordTokenExpiresIn: 3600,
    password: {
      hash: hashed,
      verify: compare,
    },
    sendResetPassword: async ({ user, url }, request) => {
      await sendForgetPasswordEmail({
        to: user.email,
        headers: request?.headers,
        url,
        user,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }, request) => {
      await sendVerificationEmail({
        to: user.email,
        headers: request?.headers,
        url,
      });
    },
  },
  socialProviders: {
    google: {
      display: 'popup',
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      redirectURI: `${env.NEXT_PUBLIC_API_URL}/v1/auth/callback/google`,
    },
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      redirectURI: `${env.NEXT_PUBLIC_API_URL}/v1/auth/callback/github`,
    },
  },
  user: {
    modelName: 'user',
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }, request) => {
        await sendDeleteAccountEmail({
          to: user.email,
          headers: request?.headers,
          url,
          user,
        });
      },
    },
    additionalFields: {
      role: {
        type: 'string',
        required: true,
        defaultValue: 'user' as Roles,
        input: false,
      },
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['google', 'github', 'email-password'],
      allowDifferentEmails: false,
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return { data: { ...user, role: 'user' } };
        },
      },
    },
  },
} satisfies BetterAuthOptions;

export const auth = betterAuth(authServer);
