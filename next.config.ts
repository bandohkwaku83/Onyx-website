import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Uploaded files are served from /api/images. Next's optimizer only
    // accepts static files or allow-listed remote hosts for those paths.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
