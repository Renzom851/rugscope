const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const preferredPort = Number(process.env.PORT) || 5173;
const host = process.env.HOST || "localhost";
let currentPort = preferredPort;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".zip": "application/zip",
  ".txt": "text/plain; charset=utf-8"
};

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || `${host}:${currentPort}`}`);
  let safePath = "";
  try {
    safePath = decodeURIComponent(url.pathname).replace(/^\/+/, "");
  } catch {
    send(response, 400, "text/plain; charset=utf-8", "Bad request");
    return;
  }

  const requestedPath = safePath || "index.html";
  const resolvedPath = path.resolve(root, requestedPath);
  const relativePath = path.relative(root, resolvedPath);

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    send(response, 403, "text/plain; charset=utf-8", "Forbidden");
    return;
  }

  fs.stat(resolvedPath, (statError, stats) => {
    if (statError) {
      send(response, 404, "text/plain; charset=utf-8", "Not found");
      return;
    }

    const filePath = stats.isDirectory() ? path.join(resolvedPath, "index.html") : resolvedPath;
    fs.readFile(filePath, (readError, content) => {
      if (readError) {
        send(response, 404, "text/plain; charset=utf-8", "Not found");
        return;
      }

      const type = mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream";
      send(response, 200, type, content);
    });
  });
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE" && currentPort < preferredPort + 20) {
    currentPort += 1;
    server.listen(currentPort, host);
    return;
  }

  throw error;
});

server.listen(currentPort, host, () => {
  console.log(`Rugscope site running at http://${host}:${currentPort}`);
});

function send(response, statusCode, contentType, content) {
  response.writeHead(statusCode, {
    "Content-Type": contentType
  });
  response.end(content);
}
