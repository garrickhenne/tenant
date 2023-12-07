// Mock Postal Codes

const postalCodesArray = [
  { postalCode: 'V6E-3P1', lat: 49.283952, long: -123.120564 },
  { postalCode: 'V6B-2S2', lat: 49.275148, long: -123.121799 },
  { postalCode: 'V3L-1A9', lat: 49.207162, long: -122.904681 },
  { postalCode: 'V6G-2P6', lat: 49.287706, long: -123.140656 },
  { postalCode: 'V6X-1P2', lat: 49.188615, long: -123.122252 },
  { postalCode: 'V4W-3E1', lat: 49.058448, long: -122.490646 },
  { postalCode: 'V2X-0P1', lat: 49.217312, long: -122.602006 },
  { postalCode: 'V6A-2C7', lat: 49.277560, long: -123.080461 },
  { postalCode: 'V3W-7X4', lat: 49.149002, long: -122.862634 },
  { postalCode: 'V8T-4Z1', lat: 48.443879, long: -123.370481 },
  { postalCode: 'V4W-1J7', lat: 49.101122, long: -122.500799 },
  { postalCode: 'V8W-1T7', lat: 48.425567, long: -123.369589 },
  { postalCode: 'V9L-3R8', lat: 48.781124, long: -123.699119 },
  { postalCode: 'V7W-2T7', lat: 49.402291, long: -123.245544 },
  { postalCode: 'V8X-4Y6', lat: 48.490682, long: -123.365907 },
  { postalCode: 'V2R-5M4', lat: 49.112156, long: -121.956112 },
  { postalCode: 'V6B-3L9', lat: 49.278972, long: -123.121157 },
  { postalCode: 'V1J-3X6', lat: 56.243588, long: -120.847986 },
  { postalCode: 'V3W-5A4', lat: 49.132793, long: -122.846557 },
  { postalCode: 'V5R-1N7', lat: 49.246479, long: -123.046610 },
  { postalCode: 'V7P-3N6', lat: 49.318591, long: -123.102152 },
  { postalCode: 'V6Z-2H7', lat: 49.281910, long: -123.120493 },
  { postalCode: 'V8T-5E5', lat: 48.427476, long: -123.352904 },
  { postalCode: 'V6K-1R8', lat: 49.268614, long: -123.176957 }
];

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export interface IDbResetLocation {
  postalCode: string;
  lat: number;
  long: number,
}

export const getRandomLocation = function (): IDbResetLocation {
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