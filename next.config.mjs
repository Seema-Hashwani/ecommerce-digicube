//** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


// next.config.mjs
export default {
    reactStrictMode: true,
    swcMinify: true,
    env: {
      CUSTOM_API_URL: process.env.CUSTOM_API_URL,
    },
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '3000', // Add port if necessary
        },
      ],
    },
    i18n: {
      locales: ['en', 'es', 'fr'],
      defaultLocale: 'en',
    },
    async redirects() {
      return [
        {
          source: '/old-path',
          destination: '/new-path',
          permanent: true,
        },
      ];
    },
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://api.example.com/:path*',
        },
      ];
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            { key: 'Cache-Control', value: 'public, max-age=31536000, must-revalidate' },
            { key: 'X-Content-Type-Options', value: 'nosniff' },
          ],
        },
      ];
    },
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = { fs: false };
      }
      return config;
    },
  };
  