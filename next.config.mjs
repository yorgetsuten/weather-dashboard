/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.weatherapi.com/v1/:path*',
      },
    ]
  }
}
// :path*

export default nextConfig
