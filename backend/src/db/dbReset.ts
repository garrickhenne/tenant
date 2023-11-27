import { connectToMongoDB, closeMongoDBConnection } from './connection';
import dotenv from 'dotenv';
import Landlord from '../model/Landlord';
import User from '../model/User';
import Review from '../model/Review';
import Incident from '../model/Incident';
import Property from '../model/Property';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { getRandomPostalCode, randomReview } from './dbResetHelper';

//For env File
dotenv.config();

const deleteRecords = async function () {

  try {

    // Removing Landlords.  Empty {} means anything
    await Landlord.deleteMany({});

    await User.deleteMany({});

    await Review.deleteMany({});

    await Incident.deleteMany({});

    await Property.deleteMany({});

  } catch (error) {
    console.log('Error resetting database:', error);
  }
};

const populateRecords = async function () {
  const mockLandlords = [];
  const mockUsers = [];

  // arbitrary 15
  const numOfLandlords = 15;

  // we want the number of users and landlords to be the same for ease of mocking reviews.  Subtract 3 because we want to include ourselves, the devs!
  const numOfUsers = numOfLandlords - 3;
  const verySecureUserPassword = '123';

  // MASS Mock Landlords
  for (let i = 0; i < numOfLandlords; i++) {
    const newLandlord = new Landlord({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      organization: faker.company.name(),
    });

    mockLandlords.push(newLandlord);
  }

  // MASS Mock Users
  const hash = bcrypt.hashSync(verySecureUserPassword, 10);
  for (let i = 0; i < numOfUsers; i++) {
    const newUser = new User({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: hash,
    });

    mockUsers.push(newUser);
  }

  // Don't forget about us!
  const garrick = new User({
    username: 'gh',
    email: 'gh@email.com',
    password: hash,
  });
  mockUsers.push(garrick);

  const dan = new User({
    username: 'dt',
    email: 'dt@email.com',
    password: hash,
  });
  mockUsers.push(dan);

  const rob = new User({
    username: 'rs',
    email: 'rs@email.com',
    password: hash,
  });
  mockUsers.push(rob);

  try {
    const savedLandlords = await Landlord.insertMany(mockLandlords);
    const savedUsers = await User.insertMany(mockUsers);

    //MASS Mock Properties
    //Use savedLandlords to create mock data for properties
    const mockProperties = savedLandlords.map((landlord) => ({
      postalCode: getRandomPostalCode(),
      streetName: faker.location.street(),
      streetNumber: 42,
      landlordId: landlord._id, // Reference to the landlord's _id
    }));

    await Property.insertMany(mockProperties);

    // MASS Mock Reviews
    const mockReviews = savedUsers.map((user, index) => {

      // generate random review with preset ratings/titles/desc
      const aReview = randomReview();
      const reviewRating = aReview.rating;
      const reviewTitle = aReview.title;
      const entry = {
        title: reviewTitle,
        description: aReview.desc,
        sentiment: 0,
        healthSafety: reviewRating,
        respect: reviewRating,
        repair: reviewRating,
        userId: user._id,
        landlordId: savedLandlords[index]._id,
      };
      return entry;
    });

    await Review.insertMany(mockReviews);
    console.log('Mock data created successfully.');
  } catch (error) {
    console.error('Error creating mock data:', error);
  }
};

const resetDatabase = async function () {
  let connection;
  try {
    // Establish the connection
    connection = await connectToMongoDB();
    console.log('Deleting all records...');
    await deleteRecords();
    console.log('Re-populating all records...');
    await populateRecords();
    console.log('Database reset.');

  } catch (error) {
    console.error('Error resetting database:', error);
  }
  finally {
    await closeMongoDBConnection();
  }
};

const executeCommand = async function (command: string) {
  if (command === 'dbreset') {
    await resetDatabase();
    return;
  }
  console.log('Invalid command.  Please use "dbreset"');
};

// get everthing after the 2nd arguments (1st and 2nd are meta data)
const args = process.argv.slice(2);

// Get the first argument from argv.
const command = args[0];

// Execute the command
executeCommand(command);

// from the cmd line, do 'npm run dbreset'
// make sure the services are running in the backend. 'npm run start'