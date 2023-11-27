// Mock Postal Codes
const postalCodesArray = [
  'V6E 3P1', 'V6B 2S2', 'V3L 1A9', 'V4W 3E1', 'V2X 0P1', 'V7G 1M9', 'V6K 3W9', 'V3N 3N4', 'V5X 3T6', 'V6K 1N7',
  'V6A 2C7', 'V3W 7X4', 'V8T 4Z1', 'V4W 1J7', 'V8W 1T7', 'V9L 3R8', 'V7W 2T7', 'V8X 4Y6', 'V2R 5M4', 'V6B 3L9',
  'V1J 3X6', 'V3W 5A4', 'V5R 1N7', 'V7P 3N6', 'V6Z 2H7', 'V8T 5E5', 'V6K 1R8', 'V6C 2B5', 'V2S 3R9', 'V2X 2L7',
  'V0J 1P0', 'V2T 1V2', 'V5B 4Z6', 'V0H 1Z1', 'V3H 2C1', 'V6G 2P6', 'V6X 1P2'
];

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomPostalCode = function (): string {
  return postalCodesArray[getRandomInt(0, postalCodesArray.length - 1)];
};

// Mock Random Review
interface Review {
  desc: string;
  rating: number;
  title: string;
}

const positiveReviews: Review[] = [
  { title: "BEST LANDLORD EVER", desc: "My landlord is incredibly responsive and always fixes issues promptly.", rating: 4 },
  { title: "Reliable Building Manager, would recommend", desc: "I appreciate how accommodating my landlord has been whenever I've had concerns.", rating: 5 },
  { title: "Best Team to Manage Properties", desc: "The property management team is friendly and ensures a smooth renting experience.", rating: 5 }
];

const negativeReviews: Review[] = [
  { title: "Scum of the earth", desc: "Constant delays in addressing maintenance requests make living here frustrating.", rating: 3 },
  { title: "What has two ears and smart?  Not my landlord.", desc: "Communication with my landlord is near impossible, and it's impacting my stay.", rating: 2 },
  { title: "Even the cockroaches have vacated.", desc: "The property lacks proper upkeep, and the landlord seems indifferent to complaints.", rating: 1 }
];

export const randomReview = function (): Review {
  // Adjust probability for positive/negative reviews
  const isPositive = Math.random() < 0.5;
  const reviews = isPositive ? positiveReviews : negativeReviews;
  const randomIndex = Math.floor(Math.random() * reviews.length);

  return reviews[randomIndex];
};