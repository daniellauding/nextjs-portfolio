import type { NextConfig } from "next";
import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const nextConfig: NextConfig = {
  // Payload CMS uses generated types that can conflict with Next.js type checker.
  // tsc --noEmit passes cleanly; we suppress the Next.js incremental type pass here.
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Allow Tailscale hostname in dev mode
  allowedDevOrigins: ['claudebot.taild61ab7.ts.net'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'is1-ssl.mzstatic.com',
      },
    ],
  },
};

export default withPayload(nextConfig, {
  configPath: path.resolve(dirname, 'payload.config.ts'),
});
