import { PrismaClient } from '../generated/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// eslint-disable-next-line turbo/no-undeclared-env-vars
if (process.env.NODE_ENV !== 'development') globalForPrisma.prisma = prisma;

export * from '../generated/client';
