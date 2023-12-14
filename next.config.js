/** @type {import('next').NextConfig} */
const rewrites = () => {
    const apiUrl = process.env.UPLOAD_VIDEO_API;
    return [
        {
            source: "/video-upload",
            destination: apiUrl,
        },
    ];
};
const nextConfig = {
    rewrites,
}

module.exports = nextConfig
