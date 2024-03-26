/** @type {import('next').NextConfig} */
const rewrites = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_HOST;
    return [
        {
            source: "/video-upload",
            destination: apiUrl,
        },
        {
            source: "/token",
            destination: apiUrl+'/token',
        },
        {
            source: "/getVideoHistory",
            destination: apiUrl
        },
        {
            source: "/getVideoDetailByVideoId/:id",
            destination: apiUrl+'/h/:id'
        },
        {
            source: "/processVideo",
            destination: apiUrl+'/process'
        },
    ];
};
const nextConfig = {
    rewrites,
}

module.exports = {
    async headers() {
      return [
        {
          // Apply these headers to all routes in your application.
          source: '/home',
          headers: [
            {
              key: 'Cross-Origin-Embedder-Policy',
              value: 'require-corp',
            },
            {
              key: 'Cross-Origin-Opener-Policy',
              value: 'same-origin',
            },
          ],
        },
      ]
    },
    // your existing config here
    rewrites,
  }