/** @type {import('next').NextConfig} */
// Commenting out the rewrites so that it works on github
// const rewrites = () => { 
//   const apiUrl = process.env.NEXT_PUBLIC_API_HOST;
//   return [
//     {
//       source: "/video-upload",
//       destination: apiUrl,
//     },
//     {
//       source: "/token",
//       destination: apiUrl + "/token",
//     },
//     {
//       source: "/getVideoHistory",
//       destination: apiUrl,
//     },
//     {
//       source: "/getVideoDetailByVideoId/:id",
//       destination: apiUrl + "/h/:id",
//     },
//     {
//       source: "/processVideo",
//       destination: apiUrl + "/process",
//     },
//   ];
// };
const isGitHubPages = process.env.NEXT_PUBLIC_DEPLOYMENT === 'github-pages';

const nextConfig = {
  output: "export",
  basePath: isGitHubPages ? "/YourRepoName" : "",
  assetPrefix: isGitHubPages ? "/YourRepoName/" : "",
  images: { unoptimized: true },
};

module.exports = nextConfig;
