import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  transpilePackages: ['@pos/ui'],
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    remotePatterns: [{ hostname: 'lh3.googleusercontent.com' }, { hostname: 'res.cloudinary.com' }],
  },
};

export default withNextIntl(nextConfig);
