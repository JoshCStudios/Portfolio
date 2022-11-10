/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DYNAMODB_ACCESS_KEY: process.env.DYNAMODB_ACCESS_KEY,
    DYNAMODB_SECRET_KEY: process.env.DYNAMODB_SECRET_KEY,
    DYNAMODB_REGION: process.env.DYNAMODB_REGION,
    DYNAMODB_TABLE_NAME: process.env.DYNAMODB_TABLE_NAME
  }, 
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
