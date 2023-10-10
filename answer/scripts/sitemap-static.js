const fs = require('fs')
const globby = require('globby');
const prettier = require('prettier')

// 폴더의 파일명을 따라 url이 생성되기에, pages디렉토리 내의 모든 폴더와 파일 명을 기준으로 sitemap 생성
// 다만, 특정 파일들은 제외해야하기에 (_app, _document 등), 이를 제외하도록 sitemap 작성

const getDate = new Date().toISOString() // generated Date as ISO formaat
const DOMAIN = 'https://www.example.com'
const formatted = sitemap => prettier.format(sitemap, { parser: "html" });

(async () => {
    const pages = await globby([
        "../src/pages/*.tsx", // /pages 에 존재하는 tsx files
        "../src/pages/**/*.tsx", // /pages 내의 sub folder에 존재하는 tsx files
        // exclude
        "!../src/pages/_*.tsx", // /pages 에 존재하는 _로 시작하는 파일은 제외(! = exclude)
        "!../src/pages/[*.tsx", // /pages 에 존재하는 동적 페이지 제외
        "!../src/pages/**/[*.tsx", // /pages 내의 sub folder에 존재하는 동적 페이지 제외

    ]);

    // reference: https://www.sitemaps.org/protocol.html
    const pagesSitemap = `
    ${pages.map(page => {
        // 파일 목록을 기반으로 작업
        const path = page
            .replace("../src/pages/", "") // ../pages 로 시작하는 부분 제거
            .replace(".tsx", "") // 확장자를 가리키는 .tsx 부분 제거
            .replace(/\/index/g, ""); // index.tsx 같은 경우에는 제거 (index는 표시되지 않기 때문에)
        const routePath = path === "index" ? "" : path;
        return `
          <url>
            <loc>${DOMAIN}/${routePath}</loc>
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
      ${pagesSitemap}
    </urlset>
  `;

    const formattedSitemap = await formatted(generatedSitemap);

    fs.writeFileSync("../public/sitemap-static.xml", formattedSitemap, "utf8");
})();