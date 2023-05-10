// Import the express in typescript file
import express from 'express';
// Initialize the express engine
const app: express.Application = express();
// Take a port 8000 for running server.
const port: number = 8000;

// Handling test Re  quest
app.get('/', (req, res) => {
  res.send("Product Service, TypeScript With Express");
});

// Server setup
app.listen(port, () => {
	console.log(`Product Service, up and running at http://localhost:${port}`);
});
