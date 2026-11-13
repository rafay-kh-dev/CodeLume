/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/privacypolicy",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/termsofservice",
        destination: "/terms-of-service",
        permanent: true,
      },
      {
        source: "/privacy",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/terms",
        destination: "/terms-of-service",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me', // Yahan humne external domain ko allow kar diya
      },
    ],
  },
};

export default nextConfig;