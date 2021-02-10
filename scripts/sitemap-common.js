const fs = require("fs");
const globby = require("globby");
const prettier = require("prettier");
const db = require("../../minelist-api/dbConnector.js");

const getDate = new Date().toISOString();

const YOUR_AWESOME_DOMAIN = "https://mine-list.com";

const formatted = sitemap => prettier.format(sitemap, { parser: "html" });

(async () => {
  const pages = await globby([
    // include
    "../pages/**/*.js",
    "../pages/*.js",
    // exclude
    "!../pages/_*.js",
    "!../pages/**/\[*\].js",
    "!../pages/*/\[*\].js"
  ]);

  const pagesSitemap = `
    ${pages
      .map(page => {

        if(page.match(/\[(.*)\]/))
          return "";

        const path = page
          .replace("../pages/", "")
          .replace(".js", "")
          .replace(/\/index/g, "");
        const routePath = path === "index" ? "" : path;
        return `
          <url>
            <loc>${YOUR_AWESOME_DOMAIN}/${routePath}</loc>
            <lastmod>${getDate}</lastmod>
          </url>
        `;
      })
      .join("")}
  `;

  const serversMaps = await db.query("SELECT * FROM dbo.ServerList").then(result => {

    return result.map(server => { return `<url>
            <loc>${YOUR_AWESOME_DOMAIN}/server/${server.id}</loc>
            <lastmod>${getDate}</lastmod>
          </url>`}).join("");

  });

  const generatedSitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    >
      ${pagesSitemap}

      ${serversMaps}
    </urlset>
  `;

  const formattedSitemap = [formatted(generatedSitemap)];

  fs.writeFileSync("../public/sitemap-common.xml", formattedSitemap, "utf8");
})();