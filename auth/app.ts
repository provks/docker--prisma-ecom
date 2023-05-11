// Import the express in typescript file
import express from 'express';
// Initialize the express engine
const app: express.Application = express();
// Take a port 9000 for running server.
const port: number = 9000;
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import jwt from 'jsonwebtoken';

// built-in middleware function, parses incoming requests with JSON payloads. 
app.use(express.json());

// Handling test request
app.get('/', (req, res) => {
  res.send("Auth Service, TypeScript With Express");
});

// Register new user
app.post("/auth/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).send({ message: 'Bad Request'})
    }
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return res.json({ message: "User already exists" });
    } else {
      // create new user
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password
        }
      });
      return res.status(200).json(user);
    }
  } catch (error) {
    console.log('Error in register', error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
});

// Login user
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: 'Bad Request'})
    }
    const user = await prisma.user.findUnique({ where: { "email": email } });
    if (!user) {
      return res.json({ message: "User doesn't exist" });
    } else {
      // validate password
      if (password !== user.password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const payload = {
        email,
        name: user.name
      };
      jwt.sign(payload, 'secret123', (err, token) => {
        if (err) {
          return console.log('error: ', err);
        }
        return res.status(200).json({ token });
      });
    }
  } catch (error) {
    console.log('Error in login', error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
});


app.get("*", async (req, res) => {
  return res.status(404).send({ message: 'Not Found'})
})

// Server setup
app.listen(port, () => {
  console.log(`Auth Service, up and running at http://localhost:${port}`);
});
