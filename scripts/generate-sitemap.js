import { SitemapStream, streamToPromise } from "sitemap";
import fs from "fs";
import path from "path";

// Define the hostname
const hostname = "https://freshcarteccommerce.netlify.app";

// Fetch dynamic data (this is a placeholder; replace with your actual data source)
const categories = ["electronics", "furniture", "clothing"]; // Example categories
const brands = ["canon", "dell", "lenevo"]; // Example brands
const productDetails = [
  { id: "6428eb43dc1175abc65ca0b3", catName: "Women's%20Fashion" },
  { id: "6428def9dc1175abc65ca061", catName: "Men's%20Fashion" },
]; // Example products

// Define static routes
const staticRoutes = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/products", changefreq: "weekly", priority: 0.8 },
  { url: "/cart", changefreq: "weekly", priority: 0.7 },
  { url: "/wishlist", changefreq: "weekly", priority: 0.7 },
  { url: "/brands", changefreq: "monthly", priority: 0.6 },
  { url: "/categories", changefreq: "monthly", priority: 0.6 },
];

// Generate dynamic routes
const dynamicRoutes = [
  ...categories.map((name) => ({
    url: `/products/category/${name}`,
    changefreq: "weekly",
    priority: 0.8,
  })),
  ...brands.map((name) => ({
    url: `/products/brand/${name}`,
    changefreq: "weekly",
    priority: 0.8,
  })),
  ...productDetails.map((product) => ({
    url: `/productDetails/${product.id}/${product.catName}`,
    changefreq: "weekly",
    priority: 0.8,
  })),
];

// Combine static and dynamic routes
const routes = [...staticRoutes, ...dynamicRoutes];

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
