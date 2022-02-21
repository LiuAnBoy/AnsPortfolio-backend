module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    NEXT_PUBLIC_EMAILJS_USER_ID: process.env.NEXT_PUBLIC_EMAILJS_USER_ID,
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID:
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    NEXT_PUBLIC_EMAILJS_SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.luansportfolio.com/api/:path*', // Proxy to Backend
      },
    ];
  },
};
