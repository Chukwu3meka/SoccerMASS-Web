/** @type {import('next').NextConfig} */

const domains = [
    { host: "localhost", domain: "http://localhost:8081" },
    { host: "soccermass.com", domain: "https://soccermass.com" },
  ],
  subDomains = ["apihub", "manager", "console", "accounts"];

const nextConfig = {
  reactStrictMode: true,
  modularizeImports: {
    "@mui/material": { transform: "@mui/material/{{ member }}" },
    "@mui/icons-material": { transform: "@mui/icons-material/{{ member }}" },
  },

  env: {
    WEB_URL: process.env.NODE_ENV === "production" ? "https://soccermass.com" : "http://localhost:8081",
    API_URL: process.env.NODE_ENV === "production" ? "https://api.soccermass.com/v1" : "http://localhost:8081/v1",
  },

  async redirects() {
    return subDomains
      .flatMap((subDomain) => [
        domains.map(({ host, domain }) => ({
          source: "/:path*",
          has: [{ type: "host", value: `${subDomain}.${host}` }],
          destination: `${domain}/${subDomain}/:path*`,
          permanent: false,
        })),
      ])
      .flat();
  },
};

module.exports = nextConfig;
