import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-src 'self' https://open.spotify.com https://*.spotify.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
