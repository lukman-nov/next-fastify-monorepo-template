import fastifyRateLimit from '@fastify/rate-limit';

export const autoConfig = () => {
  return {
    max: 5,
    timeWindow: '1 minute',
  };
};

export default fastifyRateLimit;
