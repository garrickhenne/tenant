import * as path from 'path';
import dotenv from 'dotenv';
dotenv.config();


const filePath = path.resolve(__dirname, './.gac.json');
process.env.GOOGLE_APPLICATION_CREDENTIALS = filePath;

import { LanguageServiceClient } from '@google-cloud/language';

const languageClient = new LanguageServiceClient();

const callGoogleSenti = function(inputText: string) {
  
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

  const calculateSentimentAverage = function(entities: IEntity[]): number | null {
    if (entities.length === 0) {
      return null;
    }

    let totalScore = 0;

    for (const entity of entities) {
      totalScore += entity.sentiment.score;
    }

    const averageScore = totalScore / entities.length;

    return averageScore;
  };

  // Detects sentiment of entities in the document
  languageClient.analyzeEntitySentiment({ document })
    .then(([result]) => {
      const entities: any = result.entities;
      calculateSentimentAverage(entities);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

export default callGoogleSenti;