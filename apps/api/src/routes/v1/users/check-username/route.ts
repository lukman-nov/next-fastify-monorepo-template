import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { prisma } from '@zx/db';
import { getUsernameReplySchema, getUsernameRequestSchema } from '@zx/shared';

export default async function V1Route(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['Users'],
      summary: 'Get user username.',
      querystring: getUsernameRequestSchema,
      response: {
        200: getUsernameReplySchema,
      },
    },
    handler: async (request, reply) => {
      const { username } = request.query;
      const user = await prisma.user.findUnique({
        where: { username },
        select: { username: true },
      });

      return reply.status(200).send({ username: user?.username ?? null });
    },
  });
}
