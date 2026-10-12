import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: "default-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none';",
  },
  {
    key: "Cross-Origin-Embedder-Policy",
    value: "require-corp",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Permitted-Cross-Domain-Policies",
    value: "none",
  },
  {
    key: "Accept-Ranges",
    value: "bytes",
  },
  {
    key: "Alt-Svc",
    value: 'h3=":443"; ma=86400',
  },
  {
    key: "Cache-Control",
    value: "public, max-age=31536000, immutable",
  },
  {
    key: "Content-Encoding",
    value: "zstd",
  },
  {
    key: "Server-Timing",
    value: 'dn-cache;desc="HIT", db;dur=14.2, render;dur=22.8',
  },
  {
    key: "Timing-Allow-Origin",
    value: "*",
  },
  {
    key: "Vary",
    value: "Accept-Encoding",
  },
  {
    key: "Age",
    value: "0",
  },
  {
    key: "Link",
    value: '</favicon.ico>; rel=preload; as=image',
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

