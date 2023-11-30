import { Request, Response } from 'express';
import { getProperties } from '../services/PropertyService';

export const getPropertiesRequest = (req: Request, res: Response) => {
  const { firstName, lastName } = req.query;

  if (typeof firstName === 'string' && typeof lastName === 'string') {
    getProperties(firstName, lastName)
      .then(properties => {
        res.json(properties);
      });
  }
};