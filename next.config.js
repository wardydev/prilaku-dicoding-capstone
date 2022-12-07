/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");

module.exports = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: "development",
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
