const fs = require('fs')

// allow all pages
const generatedSitemapAllowAll = `User-agent: *
Allow: /
`

// Disallow all pages
const generatedSitemapDisallowAll = `User-agent: *
Disallow: /`

// Allow only root
const generaateSitemapAllowOnlyRoot = `User-agent: *
Disallow: /
Allow : /$`

fs.writeFileSync('../public/robots.txt', generatedSitemapDisallowAll, 'utf8')