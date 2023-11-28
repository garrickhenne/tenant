import express, { Express, Request, Response, Application } from 'express';
import { connectToMongoDB } from './db/connection';
import dotenv from 'dotenv';
import cookieSession from 'cookie-session';
import { loginUser, signUpUser } from './controllers/UserController';
import morgan from 'morgan';
import cors from 'cors';

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
app.use(morgan('dev'));
const corsOptions = {
  origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
  credentials: true,
  optionsSuccessStatus: 200,
  exposedHeaders: ['set-cookie']
};

app.use(cors(corsOptions));

const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.post('/login', (req, res) => loginUser(req, res));
app.post('/signup', (req, res) => signUpUser(req, res));
app.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

app.listen(port, () => {

  connectToMongoDB()
    .then(() => {
      console.log(`Server is Fire at http://localhost:${port}`);
    })
    .catch(error => console.log(error));
});