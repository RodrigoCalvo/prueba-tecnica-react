import { CharactersController } from './characters-controller';
import { NextFunction, Request, Response } from 'express';

jest.mock('../utils/characters-parser', () => ({
  characterListParser: jest.fn().mockImplementation((e) => e),
  singleCharacterParser: jest.fn().mockImplementation((e) => e),
}));
jest.mock('../utils/comics-parser', () => ({
  comicsListParser: jest.fn().mockImplementation((e) => e),
}));
jest.mock('../utils/ids-generator', () => ({
  generateCommentId: jest.fn().mockReturnValue('0'),
}));

jest.mock('../db/characters-db', () => ({
  fetchCharacters: jest.fn(),
  fetchCharacter: jest.fn(),
  fetchCharacterComics: jest.fn(),
  saveCharacter: jest.fn(),
  saveComment: jest.fn(),
  saveRating: jest.fn(),
  modifyRating: jest.fn(),
  deleteComment: jest.fn(),
}));

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

describe('Given a CharactersController obj', () => {
  let req: Partial<Request>;
  let resp: Partial<Response>;
  let next: NextFunction = jest.fn();
  const controller = new CharactersController();
  beforeEach(() => {
    resp = {
      setHeader: jest.fn(),
      end: jest.fn(),
    };
  });
  describe('When method getAllCharactersController is called', () => {
    test('Then on success resp.end should be called with the data', async () => {
      const mockResult = { marvelData: 'test' };
      req = { params: { page: '' } };
      (fetchCharacters as jest.Mock).mockResolvedValue(mockResult);
      await controller.getAllCharactersController(
        req as Request,
        resp as Response,
        next
      );
      expect(resp.end).toHaveBeenCalledWith(
        JSON.stringify(mockResult.marvelData)
      );
    });
    test('Then on not success function "next" should be called with the error', async () => {
      (fetchCharacters as jest.Mock).mockResolvedValue(null);
      next = jest.fn();
      await controller.getAllCharactersController(
        req as Request,
        resp as Response,
        next
      );
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
  describe('When method getCharacterController is called', () => {
    test('Then on success resp.end should be called with the data', async () => {
      const mockResult = { marvelData: 'test' };
      req = { params: { id: '1111111' } };
      (fetchCharacter as jest.Mock).mockResolvedValue(mockResult);
      await controller.getCharacterController(
        req as Request,
        resp as Response,
        next
      );
      expect(resp.end).toHaveBeenCalledWith(
        JSON.stringify(mockResult.marvelData)
      );
    });
  });
  describe('When method getCharacterComicsController is called', () => {
    test('Then on success resp.end should be called with the data', async () => {
      const mockResult = 'test';
      req = { params: { id: '1111111' } };
      (fetchCharacterComics as jest.Mock).mockResolvedValue(mockResult);
      await controller.getCharacterComicsController(
        req as Request,
        resp as Response,
        next
      );
      expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
    });
  });
  describe('When method postCharacterController is called', () => {
    test('Then on success resp.end should be called with the data', async () => {
      const mockResult = { success: true };
      req = { body: { id: '1111111', comments: [], ratings: [] } };
      (saveCharacter as jest.Mock).mockResolvedValue(true);
      await controller.postCharacterController(
        req as Request,
        resp as Response,
        next
      );
      expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
    });
  });
  describe('When method postCharacterCommentController is called', () => {
    test('Then on success resp.end should be called with the data', async () => {
      const mockResult = { id: '0', textContent: 'text', user: 'testUser' };
      req = {
        body: {
          characterId: '1111111',
          comment: { textContent: 'test', user: 'testUser' },
        },
      };
      (saveComment as jest.Mock).mockReturnValue(mockResult);
      await controller.postCharacterCommentController(
        req as Request,
        resp as Response,
        next
      );
      expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
    });
  });
  describe('When method postCharacterRatingController is called', () => {
    test('Then on success resp.end should be called with the data', async () => {
      const mockResult = 'test';
      req = {
        body: {
          characterId: '1111111',
          rating: { rating: 1, user: 'testUser' },
        },
      };
      (saveRating as jest.Mock).mockReturnValue(mockResult);
      await controller.postCharacterRatingController(
        req as Request,
        resp as Response,
        next
      );
      expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
    });
  });
  describe('When method patchCharacterRatingController is called', () => {
    test('Then on success resp.end should be called with the data', async () => {
      const mockResult = { test: 'test' };
      req = {
        body: {
          characterId: '1111111',
          rating: { rating: 1, user: 'testUser' },
        },
      };
      (modifyRating as jest.Mock).mockReturnValue(mockResult);
      await controller.patchCharacterRatingController(
        req as Request,
        resp as Response,
        next
      );
      expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
    });
  });
  describe('When method deleteCharacterCommentController is called', () => {
    test('Then on success resp.end should be called with the data', async () => {
      const mockResult = { success: true };
      req = {
        body: {
          characterId: '1111111',
          commentId: 'test',
        },
      };
      (deleteComment as jest.Mock).mockResolvedValue(true);
      await controller.deleteCharacterCommentController(
        req as Request,
        resp as Response,
        next
      );
      expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
    });
  });
});
