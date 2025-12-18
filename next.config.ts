import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  // API proxying to handle CORS and simplify client requests
  async rewrites() {
    const apiProtocol =
      process.env.API_PROTOCOL ||
      (process.env.NODE_ENV === "production" ? "https" : "http")

    return [
      {
        source: "/api/:path*",
        destination: `${apiProtocol}://${process.env.API_BASE_URL}/:path*`, // Proxy to Backend
      },
    ]
  },
}

export default nextConfig
