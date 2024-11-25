import { NextFunction, Request, Response } from 'express';
import {
  fetchCharacters,
  fetchCharacter,
  fetchCharacterComics,
  saveCharacter,
  saveComment,
  saveRating,
  modifyRating,
  deleteComment,
} from '../db/characters-db';
import {
  characterListParser,
  singleCharacterParser,
} from '../utils/characters-parser';
import { comicsListParser } from '../utils/comics-parser';
import { CharacterDbVM, Comment, Rating } from '../models/characters';
import { generateCommentId } from '../utils/ids-generator';

export class CharactersController {
  getAllCharactersController = async (
    req: Request,
    resp: Response,
    next: NextFunction
  ) => {
    try {
      const { page } = req.params;
      const { marvelData, dbData } = (await fetchCharacters(page)) || {};
      if (!marvelData) throw new Error('Not data');

      const result = characterListParser(marvelData, dbData);
      resp.setHeader('Content-type', 'application/json');
      resp.end(JSON.stringify(result));
    } catch (error) {
      next(error);
    }
  };

  getCharacterController = async (
    req: Request,
    resp: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      if (
        !id ||
        isNaN(Number(id)) ||
        Number(id) <= 0 ||
        !Number.isInteger(Number(id))
      )
        throw new Error('Wrong id');

      const { marvelData, dbData } = (await fetchCharacter(Number(id))) || {};
      if (!marvelData) throw new Error('Not data');
      const result = singleCharacterParser(marvelData, dbData); // { attributionText: string; character: CharacterVM }
      resp.setHeader('Content-type', 'application/json');
      resp.end(JSON.stringify(result));
    } catch (error) {
      next(error);
    }
  };

  getCharacterComicsController = async (
    req: Request,
    resp: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      if (
        !id ||
        isNaN(Number(id)) ||
        Number(id) <= 0 ||
        !Number.isInteger(Number(id))
      )
        throw new Error('Wrong id');

      const marvelData = await fetchCharacterComics(Number(id));
      if (!marvelData) throw new Error('Not data');

      const result = comicsListParser(marvelData);
      resp.setHeader('Content-type', 'application/json');
      resp.end(JSON.stringify(result));
    } catch (error) {
      next(error);
    }
  };

  postCharacterController = (
    req: Request<{}, {}, CharacterDbVM>,
    resp: Response,
    next: NextFunction
  ) => {
    try {
      const { id, comments, ratings } = req.body;
      if (
        !id ||
        isNaN(Number(id)) ||
        Number(id) <= 0 ||
        !Number.isInteger(Number(id))
      )
        throw new Error('Wrong id');
      if (!Array.isArray(comments) || !Array.isArray(ratings))
        throw new Error('Wrong request body');
      const result = { success: !!saveCharacter({ id, comments, ratings }) };
      resp.setHeader('Content-type', 'application/json');
      resp.end(JSON.stringify(result));
    } catch (error) {
      next(error);
    }
  };

  postCharacterCommentController = (
    req: Request<
      {},
      {},
      { characterId: number; comment: Pick<Comment, 'textContent' | 'user'> }
    >,
    resp: Response,
    next: NextFunction
  ) => {
    try {
      const { characterId, comment } = req.body;
      if (
        !characterId ||
        isNaN(Number(characterId)) ||
        Number(characterId) <= 0 ||
        !Number.isInteger(Number(characterId))
      )
        throw new Error('Wrong id');
      if (!comment.textContent || !comment.user)
        throw new Error('Wrong request body');

      const result = saveComment(characterId, {
        id: generateCommentId(),
        ...comment,
      });
      resp.setHeader('Content-type', 'application/json');
      resp.end(JSON.stringify(result));
    } catch (error) {
      next(error);
    }
  };

  postCharacterRatingController = (
    req: Request<{}, {}, { characterId: number; rating: Rating }>,
    resp: Response,
    next: NextFunction
  ) => {
    try {
      const { characterId, rating } = req.body;
      if (
        !characterId ||
        isNaN(Number(characterId)) ||
        Number(characterId) <= 0 ||
        !Number.isInteger(Number(characterId))
      )
        throw new Error('Wrong id');
      if (!rating.rating || !rating.user) throw new Error('Wrong request body');

      const result = saveRating(characterId, rating);
      resp.setHeader('Content-type', 'application/json');
      resp.end(JSON.stringify(result));
    } catch (error) {
      next(error);
    }
  };

  patchCharacterRatingController = (
    req: Request<{}, {}, { characterId: number; rating: Rating }>,
    resp: Response,
    next: NextFunction
  ) => {
    try {
      const { characterId, rating } = req.body;
      if (
        !characterId ||
        isNaN(Number(characterId)) ||
        Number(characterId) <= 0 ||
        !Number.isInteger(Number(characterId))
      )
        throw new Error('Wrong id');
      if (!rating.rating || !rating.user) throw new Error('Wrong request body');

      const result = modifyRating(characterId, rating);
      if (!result) throw new Error("Rating doesn't exist");
      resp.setHeader('Content-type', 'application/json');
      resp.end(JSON.stringify(result));
    } catch (error) {
      next(error);
    }
  };

  deleteCharacterCommentController = (
    req: Request<{}, {}, { characterId: number; commentId: string }>,
    resp: Response,
    next: NextFunction
  ) => {
    try {
      const { characterId, commentId } = req.body;
      if (
        !characterId ||
        isNaN(Number(characterId)) ||
        Number(characterId) <= 0 ||
        !Number.isInteger(Number(characterId))
      )
        throw new Error('Wrong id');

      const result = { success: !!deleteComment(characterId, commentId) };
      resp.setHeader('Content-type', 'application/json');
      resp.end(JSON.stringify(result));
    } catch (error) {
      next(error);
    }
  };
}
