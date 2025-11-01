export default {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'ALLOW',
        },
        {
          key: 'Content-Security-Policy',
          value: "frame-ancestors 'self' https://warpcast.com https://farcaster.xyz",
        },
      ],
    },
  ],
};
