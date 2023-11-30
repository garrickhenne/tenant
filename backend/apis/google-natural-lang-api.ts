import * as path from 'path';
import dotenv from 'dotenv';
dotenv.config();


const filePath = path.resolve(__dirname, './.gac.json');
process.env.GOOGLE_APPLICATION_CREDENTIALS = filePath;

import { LanguageServiceClient } from '@google-cloud/language';

const languageClient = new LanguageServiceClient();

const callClassifyText = async function(inputText: string) {
  
  const document: IDocument = {
    content: inputText,
    type: 'PLAIN_TEXT', // or 'HTML' for HTML content
  };

  interface IDocument {
    content: string;
    type: "PLAIN_TEXT" | "HTML" | "TYPE_UNSPECIFIED"; // Ensure it matches the expected values/types
    // Other properties...
  }

  // Detects sentiment of entities in the document
  const [result] = await languageClient.analyzeEntitySentiment({ document });
  
  interface IEntity {
    sentiment: {
      magnitude: number;
      score: number;
    };
  }

  const entities: any = result.entities;

  // Helper function to calculate the average sentiment score.
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
  calculateSentimentAverage(entities);
};

process.on('unhandledRejection', err => {
  console.error(err);
  process.exitCode = 1;
});

export default callClassifyText;