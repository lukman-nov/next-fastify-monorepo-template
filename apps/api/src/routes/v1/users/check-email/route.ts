import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { prisma } from '@zx/db';
import { getEmailReplySchema, getEmailRequestSchema } from '@zx/shared';

export default async function getEmail(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['Users'],
      summary: 'Get user email.',
      querystring: getEmailRequestSchema,
      response: {
        200: getEmailReplySchema,
      },
    },
    handler: async (req, res) => {
      const { email } = req.query;
      const user = await prisma.user.findUnique({
        where: { email },
      });

      return res.status(200).send({ email: user?.email || null });
    },
  });
}
