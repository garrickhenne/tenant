import * as path from 'path';
import dotenv from 'dotenv';
dotenv.config();


const filePath = path.resolve(__dirname, './.gac.json');
process.env.GOOGLE_APPLICATION_CREDENTIALS = filePath;

import { LanguageServiceClient } from '@google-cloud/language';

const languageClient = new LanguageServiceClient();

export const callGoogleSenti = function (inputText: string): Promise<number | null> {

  const document: IDocument = {
    content: inputText,
    type: 'PLAIN_TEXT', // or 'HTML' for HTML content
  };

  interface IDocument {
    content: string;
    type: "PLAIN_TEXT" | "HTML" | "TYPE_UNSPECIFIED"; // Ensure it matches the expected values/types
    // Other properties...
  }

  interface IEntity {
    sentiment: {
      magnitude: number;
      score: number;
    };
  }

  const calculateSentimentAverage = function (entities: IEntity[]): Promise<number> {

    return new Promise((resolve, _reject) => {
      if (entities.length === 0) {
        return null;
      }

      let totalScore = 0;

      for (const entity of entities) {
        totalScore += entity.sentiment.score;
      }

      const averageScore = totalScore / entities.length;
      resolve(averageScore);
    });

  };

  // Detects sentiment of entities in the document
  return languageClient.analyzeEntitySentiment({ document })
    .then(([result]) => {
      const entities: any = result.entities;
      return calculateSentimentAverage(entities);
    })
    .catch((error) => {
      console.error('Error:', error);
      return null;
    });
};

export default callGoogleSenti;