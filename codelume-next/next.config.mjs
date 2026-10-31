/** @type {import('next').NextConfig} */
const nextConfig = {
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