/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/api/ws/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:5000/api/:path*'
            : '/api/ws/',
      },
    ]
  },
}

module.exports = nextConfig
