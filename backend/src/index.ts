import express, { Express, Request, Response, Application } from 'express';
import { connectToMongoDB } from './db/connection';
import dotenv from 'dotenv';
import cookieSession from 'cookie-session';
import { loginUser } from './controllers/UserController';

//For env File
dotenv.config();
const COOKIE_SESSION_KEY: string = process.env.COOKIE_SESSION_KEY || 'key1';

const app: Application = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieSession({
  name: 'session',
  keys: [COOKIE_SESSION_KEY]
}));

const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.post('/login', (req, res) => loginUser(req, res));

app.listen(port, () => {

  connectToMongoDB()
    .then(() => {
      console.log(`Server is Fire at http://localhost:${port}`);
    })
    .catch(error => console.log(error));
});