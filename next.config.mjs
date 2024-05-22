/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol:'https',
                hostname:'i.ibb.co'
            },
            {
                protocol:'https',
                hostname:'images.deliveryhero.io',
            },
            {
                protocol:'https',
                hostname:'lh3.googleusercontent.com',
            }
        ],
    }
};

export default nextConfig;
