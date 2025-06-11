/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['mongoose'], // movido fuera de experimental
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true, // corregido typo
    };
    return config;
  },
};

export default nextConfig;
