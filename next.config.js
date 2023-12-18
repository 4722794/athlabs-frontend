/** @type {import('next').NextConfig} */
const rewrites = () => {
    const apiUrl = 'https://main.d2ty1k492879bg.amplifyapp.com';
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
    ];
};
const nextConfig = {
    rewrites,
}

module.exports = nextConfig
