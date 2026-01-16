/*The Task: The "Product Search & Discount" API
Scenario: Imagine you are building the backend for a small shopping site. You
need to create a server that can find a product and calculate its final price after a
discount.

URL Structure: The user should be able to visit a URL like this:
localhost:8000/product?name=Laptop&price=50000&discount=10
Logic: * Extract the name, price, and discount from the URL using the url
module.
● Calculate the Final Price (Price - Discount%).
● Log this search into a file named searches.txt (using the fs module).
Output: Send back an HTML response that looks professional. */

const http = require("http");
const url = require("url");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { name, price, discount } = parsedUrl.query;

  switch (parsedUrl.pathname) {
    case "/product":
        
      if (name && price && discount) {
        const originalPrice = parseFloat(price);
        const discountPercent = parseFloat(discount);
        const finalPrice = originalPrice - (originalPrice * discountPercent) / 100;
        const logEntry = `Product: ${name}, Price: ${originalPrice}, Discount: ${discountPercent}%, Final Price: ${finalPrice}\n`;

        //create a file
        fs.appendFile("searches.txt", logEntry, (err) => {
          if (err) console.error("Error logging search:", err);
        });

        res.writeHead(200, { "Content-Type": "text/html charset=utf-8" });
        res.end(`
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Original Price:</strong> ${originalPrice}</p>
          <p><strong>Discount:</strong> ${discountPercent}%</p>
          <p><strong>Final Price:</strong> ${finalPrice}</p>
        `);
      } 

      else {
      res.writeHead(400, { "Content-Type": "text/html" });
        res.end("<h2>Missing query parameters. Please provide name, price, and discount.</h2>");
      }

      break;

    default:
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<h1>Welcome to Home Page</h1>");
      break;
  }
});

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});