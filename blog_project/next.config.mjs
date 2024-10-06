import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      env: {
        MONGO_DB_USERNAME: "Soumyajeet",
        MONGO_DB_PASSWORD: "Soumya1234",
        MONGO_DB_DATABASE: "blog-dev"
      },
    };
  }

  return {
    reactStrictMode: true,
    env: {
      MONGO_DB_USERNAME: "Soumyajeet",
      MONGO_DB_PASSWORD: "Soumya1234",
      MONGO_DB_DATABASE: "blog"
    },
  };
}
export default nextConfig;


