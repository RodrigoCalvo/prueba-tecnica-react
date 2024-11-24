import { NextFunction, Request, Response } from 'express';
import {
  addUser,
  addUserLiked,
  fetchAllUsers,
  removeUserLiked,
  searchUser,
} from '../db/users-db';

export class UsersController {
  getAllUsersController = (
    req: Request,
    resp: Response,
    next: NextFunction
  ) => {
    try {
      const result = fetchAllUsers();

      if (!result) throw new Error('Not data');
      resp.setHeader('Content-type', 'application/json');
      resp.end(JSON.stringify(result));
    } catch (error) {
      next(error);
    }
  };

  getUserController = (req: Request, resp: Response, next: NextFunction) => {
    try {
      const { name } = req.params;
      const result = searchUser(name);

      resp.setHeader('Content-type', 'application/json');
      resp.end(JSON.stringify(result));
    } catch (error) {
      next(error);
    }
  };

  postUserController = async (
    req: Request<{}, {}, { userName: string }>,
    resp: Response,
    next: NextFunction
  ) => {
    try {
      const { userName } = req.body;

      const existingUser = searchUser(userName);

      const result = existingUser ?? addUser(userName);
      resp.end(JSON.stringify(result));
    } catch (error) {
      next(error);
    }
  };

  patchAddUserCharacterLikeController = async (
    req: Request<{}, {}, { userId: string; characterId: number }>,
    resp: Response,
    next: NextFunction
  ) => {
    try {
      const { userId, characterId } = req.body;

      const result = { success: addUserLiked(userId, characterId) };
      resp.end(JSON.stringify(result));
    } catch (error) {
      next(error);
    }
  };

  patchRemoveUserCharacterLikeController = async (
    req: Request<{}, {}, { userId: string; characterId: number }>,
    resp: Response,
    next: NextFunction
  ) => {
    try {
      const { userId, characterId } = req.body;

      const result = { success: removeUserLiked(userId, characterId) };
      resp.end(JSON.stringify(result));
    } catch (error) {
      next(error);
    }
  };
}
