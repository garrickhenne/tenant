import { connectToMongoDB, closeMongoDBConnection } from './connection';
import dotenv from 'dotenv';
import Landlord from '../model/Landlord';
import User from '../model/User';
import Review from '../model/Review';
import Incident from '../model/Incident';
import Property from '../model/Property';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { getCalculatedReviewScore } from '../services/ServicesHelper';
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

  // we want the number of users and landlords to be the same for ease of mocking reviews.
  const numOfUsers = numOfLandlords;
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

    // Special Cases - create 3 dev users, create 2 properties and 2 landlords, then create two reviews from one user (gh@email.com).  We do it here because we want the special cases to show up first for the demo.

    // Don't forget about us!
    const garrick = new User({
      username: 'gh',
      email: 'gh@email.com',
      password: hash,
    });
    const garrickUser = await garrick.save();

    const dan = new User({
      username: 'dt',
      email: 'dt@email.com',
      password: hash,
    });
    const danUser = await dan.save();

    const rob = new User({
      username: 'rs',
      email: 'rs@email.com',
      password: hash,
    });
    const robUser = await rob.save();

    const scornedLandlord = new Landlord({
      firstName: 'Scrooge',
      lastName: 'McDuck',
      organization: 'Wealth, Inc.',
    });
    const savedScornedLandlord = await scornedLandlord.save();

    const nally = new Landlord({
      firstName: 'Christian',
      lastName: 'Nally',
      organization: 'LHL',
    });
    const savedNallyLandlord = await nally.save();

    const scornedProperty = new Property({
      postalCode: getRandomPostalCode(),
      streetName: faker.location.street(),
      streetNumber: 42,
      landlordId: scornedLandlord._id,
    });
    const savedScornedProperty = await scornedProperty.save();

    const nallyProperty = new Property({
      postalCode: getRandomPostalCode(),
      streetName: faker.location.street(),
      streetNumber: 42,
      landlordId: nally._id,
    });
    const savedNallyProperty = await nallyProperty.save();

    // create scorned review
    const scornedReview1 = new Review({
      title: 'Penny Pinching Landlord',
      description: 'Would never repair the radiator, the place was always very cold.  Would quack at us for making the slighest noise.',
      sentiment: -0.65,
      healthSafety: 3,
      respect: 2,
      repair: 1,
      overallScore: getCalculatedReviewScore(3, 2, 1, -0.65),
      userId: garrick._id,
      landlordId: scornedLandlord._id,
    });
    const createdScornedReview1 = await scornedReview1.save();

    // create scorned review
    const scornedReview2 = new Review({
      title: 'Always walks with a cane upstairs',
      description: 'I keep hearing a cane banging against the roof, upstairs.  One time he accepted a late payment, so I am thankful for that.  However, he is quite stingy in repairs.',
      sentiment: 0.15,
      healthSafety: 3,
      respect: 4,
      repair: 2,
      overallScore: getCalculatedReviewScore(3, 4, 2, 0.15),
      userId: dan._id,
      landlordId: scornedLandlord._id,
    });
    const createdScornedReview2 = await scornedReview2.save();

    // create scorned review
    const scornedReview3 = new Review({
      title: 'I cannot complain, the rent is cheap',
      description: 'Good value for location and comes with lots of amenities, however, they are really dated and requires lots of repair.  It would be nice if some of the appliances are upgraded.  Its 2023 and the stovetop looks like it was made in 1965.',
      sentiment: 0.15,
      healthSafety: 3,
      respect: 3,
      repair: 3,
      overallScore: getCalculatedReviewScore(3, 3, 3, 0.15),
      userId: rob._id,
      landlordId: scornedLandlord._id,
    });
    const createdScornedReview3 = await scornedReview3.save();

    // create nally review
    const nallyReview = new Review({
      title: 'Fantastic Landlord',
      description: 'No complaints.  Some notes: always in the attic, sometimes I hear singing and guitar strumming.  Christian keeps mentioning "Team semi-colon" at least once a day.  Has a wonderful dog named "Snoopy".',
      sentiment: 0.90,
      healthSafety: 5,
      respect: 5,
      repair: 5,
      overallScore: getCalculatedReviewScore(5, 5, 5, 0.90),
      userId: garrick._id,
      landlordId: nally._id,
    });
    const createdNallyReview = await nallyReview.save();

    // ---end of special cases


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
        overallScore: getCalculatedReviewScore(
          reviewRating,
          reviewRating,
          reviewRating,
          0
        )
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