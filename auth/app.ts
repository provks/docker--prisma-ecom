// Import the express in typescript file
import express from 'express';
// Initialize the express engine
const app: express.Application = express();
// Take a port 9000 for running server.
const port: number = 9000;
import { PrismaClient } from '@prisma/client'; 
const prisma = new PrismaClient();

// Handling test Re  quest
app.get('/', (req, res) => {
  res.send("Auth Service, TypeScript With Express");
});


app.get('/feed', async (req, res) => {
  const posts = await prisma.user.findMany({
    // where: { published: true },
    // include: { author: true },
  })
  res.status(200).json(posts);
})


// Server setup
app.listen(port, () => {
	console.log(`Auth Service, up and running at	http://localhost:${port}`);
});
