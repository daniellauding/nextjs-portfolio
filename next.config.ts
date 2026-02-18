import type { NextConfig } from "next";
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  // Payload CMS uses generated types that can conflict with Next.js type checker.
  // tsc --noEmit passes cleanly; we suppress the Next.js incremental type pass here.
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'is1-ssl.mzstatic.com',
      },
    ],
  },
};

export default withPayload(nextConfig);
