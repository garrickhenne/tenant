import * as path from 'path';
import dotenv from 'dotenv';
dotenv.config();


const filePath = path.resolve(__dirname, './.gac.json');
process.env.GOOGLE_APPLICATION_CREDENTIALS = filePath;

// Keep code just in case v2 fails we can use v1 version
// import { LanguageServiceClient } from '@google-cloud/language';
const LanguageServiceClientV2 = require('@google-cloud/language').v2;


// const languageClient = new LanguageServiceClient();
const client = new LanguageServiceClientV2.LanguageServiceClient();

export const callGoogleSenti = async function (inputText: string): Promise<number | null> {

  const document: IDocument = {
    content: inputText,
    type: 'PLAIN_TEXT', // or 'HTML' for HTML content
  };

  interface IDocument {
    content: string;
    type: "PLAIN_TEXT" | "HTML" | "TYPE_UNSPECIFIED"; // Ensure it matches the expected values/types
    // Other properties...
  }

  const [result] = await client.analyzeSentiment({ document: document });
  const sentiment = result.documentSentiment;
  return sentiment.score;

  // Keep code just in case v2 fails we can use v1 version
  // interface IEntity {
  //   sentiment: {
  //     magnitude: number;
  //     score: number;
  //   };
  // }

  // Keep code just in case v2 fails we can use v1 averages
  // const calculateSentimentAverage = function (entities: IEntity[]): number | null {

  //   if (entities.length === 0) {
  //     return null;
  //   }

  //   let totalScore = 0;

  //   for (const entity of entities) {
  //     totalScore += entity.sentiment.score;
  //   }

  //   const averageScore = totalScore / entities.length;
  //   return averageScore;
  // };



  // Detects sentiment of entities in the document
  //   return languageClient.analyzeEntitySentiment({ document })
  //     .then(([result]) => {
  //       console.log("result", result);
  //       const entities: any = result.entities;
  //       return calculateSentimentAverage(entities);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //       return null;
  //     });
  // };

  // Just in case, keep v1 of the API call
  //   return languageClient.analyzeEntitySentiment({ document })
  //     .then(([result]) => {
  //       // console.log("result", result);
  //       const entities: any = result.entities;
  //       return calculateSentimentAverage(entities);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //       return null;
  //     });
  // };
};

export default callGoogleSenti;