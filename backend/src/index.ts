import express, { Express, Request, Response, Application } from 'express';
import { connectToMongoDB } from './db/connection';
import dotenv from 'dotenv';
import cookieSession from 'cookie-session';
import { loginUser, signUpUser } from './controllers/UserController';
import morgan from 'morgan';

// Controllers
import { createReviewRequest } from './controllers/ReviewController';
import { getPropertiesRequest } from './controllers/PropertyController';

//Routes
const dashboardRouter = require('./routes/dashboardRouter');

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

const port = process.env.PORT || 8000;

// Mount the routers for specific URLS
app.use('/api/dashboard', dashboardRouter);

// TODO mount your other routers here! =D
// app.use('/api/landlords', landLordRouter);
// ...

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.post('/api/createReview', (req, res) => createReviewRequest(req, res));
app.get('/api/getProperties', getPropertiesRequest);

app.post('/api/login', (req, res) => loginUser(req, res));
app.post('/api/signup', (req, res) => signUpUser(req, res));
app.get('/api/logout', (req, res) => {
  req.session!.user = null;
  res.redirect('/');
});

app.listen(port, () => {

  connectToMongoDB()
    .then(() => {
      console.log(`Server is Fire at http://localhost:${port}`);
    })
    .catch(error => console.log(error));
});