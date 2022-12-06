/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: "development",
});

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "upload.wikimedia.org",
      "prekuel.com",
      "lh3.googleusercontent.com",
    ],
  },
});
