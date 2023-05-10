// Import the express in typescript file
import express from 'express';
// Initialize the express engine
const app: express.Application = express();
// Take a port 7000 for running server.
const port: number = 7000;

// Handling test Re  quest
app.get('/', (req, res) => {
  res.send("Order Service, TypeScript With Express");
});

// Server setup
app.listen(port, () => {
	console.log(`Order Service, up and running at http://localhost:${port}`);
});
