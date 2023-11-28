import mongoose, { Connection } from 'mongoose';

let mongooseConnection: typeof mongoose | undefined;

// Function to establish MongoDB connection
export const connectToMongoDB = async(): Promise<Connection> => {
  try {
    mongooseConnection = await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@cluster0.p7l79i6.mongodb.net/?retryWrites=true&w=majority`, {
      dbName: 'test',
      // Other options if needed
    });
    console.log('Connected to MongoDB');

    // Return the connection object for re-use
    return mongooseConnection.connection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);

    // Throw error for handling in calling code, required for promise.
    throw error;
  }
};

export const closeMongoDBConnection = async() => {
  if (mongooseConnection) {
    try {
      await mongooseConnection.disconnect();
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error);
      throw error;
    }
  } else {
    console.log('No MongoDB connection found.');
  }
};