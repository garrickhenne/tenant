import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
  // Connect to Mongo.
  // TODO: Maybe move this connection somewhere else and add options to the connect method to specify database: test or prod.
  mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@cluster0.p7l79i6.mongodb.net/?retryWrites=true&w=majority`, { dbName: 'test' })
    .then(() => {
      console.log(`Server is Fire at http://localhost:${port}`);
    })
    .catch(error => console.log(error));
});