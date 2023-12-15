/** @type {import('next').NextConfig} */
const rewrites = () => {
    const apiUrl = 'http://api.athlabs.co';
    return [
        {
            source: "/video-upload",
            destination: apiUrl,
        },
        {
            source: "/token",
            destination: apiUrl+'/token',
        },
    ];
};
const nextConfig = {
    rewrites,
}

module.exports = nextConfig
