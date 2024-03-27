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
      destination: apiUrl + "/token",
    },
    {
      source: "/getVideoHistory",
      destination: apiUrl,
    },
    {
      source: "/getVideoDetailByVideoId/:id",
      destination: apiUrl + "/h/:id",
    },
    {
      source: "/processVideo",
      destination: apiUrl + "/process",
    },
  ];
};
const nextConfig = {
  rewrites,
};

module.exports = nextConfig;
