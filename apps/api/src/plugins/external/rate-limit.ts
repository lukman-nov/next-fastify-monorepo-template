import fastifyRateLimit from '@fastify/rate-limit';

export const autoConfig = () => {
  return {
    max: 20,
    timeWindow: '1 minute',
  };
};

export default fastifyRateLimit;
