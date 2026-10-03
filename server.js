const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname);
const port = Number(process.env.PORT) || 3000;
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".pdf": "application/pdf",
  ".svg": "image/svg+xml",
  ".webp": "image/webp"
};
const csp = "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self' https://formspree.io; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self'; connect-src 'self' https://formspree.io; upgrade-insecure-requests";

function sendFile(request, response, filePath, content, status = 200) {
  response.writeHead(status, {
    "Content-Type": contentTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "Content-Security-Policy": csp
  });
  response.end(request.method === "HEAD" ? undefined : content);
}

const server = http.createServer((request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end("Method not allowed");
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  } catch {
    response.writeHead(400);
    response.end("Bad request");
    return;
  }

  const requestedPath = path.resolve(root, `.${pathname}`);
  const relativePath = path.relative(root, requestedPath);
  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.stat(requestedPath, (statError, stats) => {
    const target = !statError && stats.isDirectory()
      ? path.join(requestedPath, "index.html")
      : requestedPath;

    fs.readFile(target, (error, content) => {
      if (!error) {
        sendFile(request, response, target, content);
        return;
      }
      if (error.code !== "ENOENT") {
        response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("Server error");
        return;
      }
      const notFoundPage = path.join(root, "404.html");
      fs.readFile(notFoundPage, (fallbackError, fallbackContent) => {
        if (fallbackError) {
          response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
          response.end("Not found");
          return;
        }
        sendFile(request, response, notFoundPage, fallbackContent, 404);
      });
    });
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Portfolio is running at http://127.0.0.1:${port}`);
});
