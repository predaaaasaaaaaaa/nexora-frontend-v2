/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://nexora-ai.org',
  generateRobotsTxt: false,
  outDir: './public',
  exclude: ['/dashboard', '/settings', '/coach', '/scheduler', '/ideas', '/analytics', '/login', '/signup', '/forgot-password', '/reset-password'],
}