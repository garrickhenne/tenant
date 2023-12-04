import express, { Express, Request, Response, Application } from 'express';
import { connectToMongoDB } from './db/connection';
import dotenv from 'dotenv';
import cookieSession from 'cookie-session';
import morgan from 'morgan';
import { searchLandlord, getReviewsWithLandlordId } from './controllers/LandlordController';

// Controllers
import { getPropertiesRequest, getAllPropertiesRequest } from './controllers/PropertyController';
import { loginUser, signUpUser } from './controllers/UserController';

//Routes
const dashboardRouter = require('./routes/dashboardRouter');
const reviewRouter = require('./routes/reviewRouter');

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
app.use('/api/review', reviewRouter);
// ...

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.get('/api/getProperties', getPropertiesRequest);
app.get('/api/getAllProperties', getAllPropertiesRequest);
app.post('/api/login', (req, res) => loginUser(req, res));
app.post('/api/signup', (req, res) => signUpUser(req, res));
app.get('/api/logout', (req, res) => {
  req.session!.user = null;
  res.redirect('/');
});
app.get('/api/landlords', getReviewsWithLandlordId);
app.get('/api/search', searchLandlord);

app.listen(port, () => {

  connectToMongoDB()
    .then(() => {
      console.log(`Server is Fire at http://localhost:${port}`);
    })
    .catch(error => console.log(error));
});