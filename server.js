const http = require("http");
const fs = require("fs");
const url = require("url");

// Create HTTP server
const server = http.createServer((req, res) => {
    
    // Parse query parameters from URL
    const parsedUrl = url.parse(req.url, true);
    const { name, age } = parsedUrl.query;
    console.log(name);
    console.log(age);

    // Send query response
    res.end(`name -> ${name} \n age -> ${age}`);

    // Log request details with timestamp
    const timestamp = new Date().toLocaleString();
    const log = `user is required at: ${timestamp} for request: ${req.url}\n`;
    // Append log to activity.log file
    fs.appendFile("activity.log", log, (err) => {
        if (err) {
            console.log("Failed to write log");
        } else {
            console.log("success");
        }
    });
     
    // Routing based on request URL
    switch (req.url) {
        case "/":
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end("<h1>Welcome to Home Page</h1>");
            break;

        case "/about":
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end("<h1>Welcome to About Page</h1>");
            break;

        case "/alllogs":
            fs.readFile("activity.log", "utf-8", (err, data) => {
                if (err) {
                    res.writeHead(500, { "Content-Type": "text/html" });
                    res.end("Error Reading all logs\n");
                } else {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(`<pre>${data}</pre>`); // show logs in preformatted style
                }
            });
            break;

        default:
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("<h1>Page not found</h1>");
            break;
    }
});

// Start server
server.listen(8000, () => {
    console.log("Server is running on port 8000");
});

