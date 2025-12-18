import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  // API proxying to handle CORS and simplify client requests
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://${process.env.API_BASE_URL}/:path*`, // Proxy to Backend
      },
    ]
  },
}

export default nextConfig
