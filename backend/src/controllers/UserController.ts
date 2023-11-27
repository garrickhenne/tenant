import { IUser } from "../model/User";
import { authUserCredentials, createUser } from "../services/UserService";
import { Request, Response } from "express";


export const loginUser = (req: Request, res: Response) => {
  const { email, password }: IUser = req.body;

  authUserCredentials(email, password)
    .then(authenticatedUser => {
      if (authenticatedUser) {
        req.session!.user = authenticatedUser;
        res.json(authenticatedUser.email);
      } else {
        res.status(401).json({ message: 'User could not be logged in.' });
      }
    });
};

export const signUpUser = (req: Request, res: Response) => {
  const { email, password, username }: IUser = req.body;

  createUser(username, email, password)
    .then(user => {
      req.session!.user = user;
      res.json(user.email);
    })
    .catch(err => res.status(401).send({ message: err }));
};