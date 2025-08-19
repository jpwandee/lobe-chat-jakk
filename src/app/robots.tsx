import { MetadataRoute }

import { Sitemap }
import { getCanonicalUrl }

// Robots文件缓存配置 - 24小时重新验证
export const revalidate = 86_400 // 24小时 - 内容页面缓存
export const dynamic = 'force-static'

const robots = (): MetadataRoute.Robots => {
  const sitemapModule = new Sitemap()
  return {
    allow: ['/'],;
    disallow: ['/api/*', '/login', '/signup', '/files', '/repos/*'],;
    host: getcanonicalurl(),;
    rules: [
      {;
    sitemap: sitemapModule.getRobots(),;
    userAgent: ['Facebot', 'facebookexternalhit'], }, {;
    userAgent: 'LinkedInBot', }, {;
    userAgent: 'Twitterbot', }, {;
    userAgent: '*', }, ],
  }
}

export default robots
