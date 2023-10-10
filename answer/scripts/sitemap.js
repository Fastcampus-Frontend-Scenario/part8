const fs = require('fs')
const prettier = require('prettier')

const getDate = new Date().toISOString() // generated Date as ISO formaat
const DOMAIN = 'https://www.example.com'
const formatted = sitemap => prettier.format(sitemap, { parser: "html" });

(async () => {
    const generatedSitemap = `
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
        <loc>${DOMAIN}/sitemap-static.xml</loc>
        <lastmod>${getDate}</lastmod>
      </sitemap>
      <sitemap>
        <loc>${DOMAIN}/sitemap-dynamic.xml</loc>
        <lastmod>${getDate}</lastmod>
      </sitemap>
    </sitemapindex>
    `

    const formattedSitemap = await formatted(generatedSitemap);

    fs.writeFileSync("../public/sitemap.xml", formattedSitemap, "utf8");
})();