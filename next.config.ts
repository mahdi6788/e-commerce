import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // to handle error: next/image` Un-configured Host
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
