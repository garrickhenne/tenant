import express, { Express, Request, Response, Application } from 'express';
import { connectToMongoDB } from './db/connection';
import dotenv from 'dotenv';

//routes
const dashboardRouter = require('./routes/dashboardRouter');

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

// Middleware to log incoming requests
app.use((req, _res, next) => {
  console.log(`Request Made: ${req.method} ${req.url}`);
  next();
});

// Mount the routers for specific URLS
app.use('/api/dashboard', dashboardRouter);

// TODO mount your other routers here! =D
// app.use('/api/landlords', landLordRouter);
// ...

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {

  connectToMongoDB()
    .then(() => {
      console.log(`Server is Fire at http://localhost:${port}`);
    })
    .catch(error => console.log(error));
});