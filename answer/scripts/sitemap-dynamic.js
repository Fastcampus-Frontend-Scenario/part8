const fs = require('fs')
const prettier = require('prettier');
const axios = require('axios');

const getDate = new Date().toISOString() // generated Date as ISO formaat
const DOMAIN = 'https://www.example.com'
const formatted = sitemap => prettier.format(sitemap, { parser: "html" });

(async () => {
    const products = await axios.get('http://localhost:3000/api/products') 
    const productIds = products.data.products.map(product => product.id)

    // reference: https://www.sitemaps.org/protocol.html
    const productsSitemap = `
    ${productIds.map(productId => {
        // 파일 목록을 기반으로 작업

        return `
          <url>
            <loc>${DOMAIN}/product/${productId}</loc>
            <lastmod>${getDate}</lastmod>
          </url>
        `;
    }).join("")}
  `;

    const generatedSitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    >
      ${productsSitemap}
    </urlset>
  `;

    const formattedSitemap = await formatted(generatedSitemap);

    fs.writeFileSync("../public/sitemap-products.xml", formattedSitemap, "utf8");
})();