/** @type {import('next').NextConfig} */
const rewrites = () => {
    return [
        {
            source: "/video-upload",
            destination: "http://api.athlabs.co",
        },
    ];
};
const nextConfig = {
    rewrites,
}

module.exports = nextConfig
