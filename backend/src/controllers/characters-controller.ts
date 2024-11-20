import { NextFunction, Request, Response } from 'express';
import { fetchCharacters } from '../db/characters-db';
import {
  MARVEL_CHARACTER_PROFILE_ENDPOINT,
  MARVEL_CHARACTERS_LIST_ENDPOINT,
  PAGE_SIZE,
} from '../config/apiConfig';

export class CharactersController {
  getAllController = async (
    req: Request,
    resp: Response,
    next: NextFunction
  ) => {
    try {
      const { page } = req.params;

      const result = await fetchCharacters(MARVEL_CHARACTERS_LIST_ENDPOINT, {
        ...(Number(page) ? { offset: Number(page) * PAGE_SIZE } : {}),
      });

      if (!result) throw new Error('Not data');
      resp.setHeader('Content-type', 'application/json');
      resp.end(JSON.stringify(result));
    } catch (error) {
      next(error);
    }
  };
  getController = async (req: Request, resp: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const result = await fetchCharacters(
        `${MARVEL_CHARACTER_PROFILE_ENDPOINT}${id}`
      );
      resp.end(JSON.stringify(result));
    } catch (error) {
      next(error);
    }
  };
}
