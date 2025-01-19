import { SitemapStream, streamToPromise } from "sitemap";
import fs from "fs";
import path from "path";

// Define the hostname and routes for the sitemap
const hostname = "https://freshcarteccommerce.netlify.app";
const routes = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/products", changefreq: "weekly", priority: 0.8 },
  // Add other routes dynamically if needed
];

// Create a SitemapStream
const sitemapStream = new SitemapStream({ hostname });

routes.forEach((route) => {
  sitemapStream.write(route);
});

sitemapStream.end();

// Write the sitemap to the "dist" directory
const sitemapPath = path.resolve("dist", "sitemap.xml");
streamToPromise(sitemapStream)
  .then((data) => {
    fs.writeFileSync(sitemapPath, data.toString());
    console.log("Sitemap generated at:", sitemapPath);
  })
  .catch((err) => {
    console.error("Error generating sitemap:", err);
  });
