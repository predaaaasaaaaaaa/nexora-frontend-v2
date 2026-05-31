/** @type {import('next-sitemap').IConfig} */
exclude: ['/dashboard', '/settings', '/coach', '/scheduler', '/ideas', '/analytics', '/login', '/signup', '/forgot-password', '/reset-password'],
module.exports = {
    siteUrl: 'https://nexora-ai.org',
    generateRobotsTxt: false,
    outDir: './public',
  }