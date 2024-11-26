import { UsersController } from './users-controller';
import { NextFunction, Request, Response } from 'express';

jest.mock('../db/users-db', () => ({
  addUser: jest.fn(),
  addUserLiked: jest.fn(),
  fetchAllUsers: jest.fn(),
  removeUserLiked: jest.fn(),
  searchUser: jest.fn(),
}));

import {
  addUser,
  addUserLiked,
  fetchAllUsers,
  removeUserLiked,
  searchUser,
} from '../db/users-db';

describe('Given a UsersController obj', () => {
  let req: Partial<Request>;
  let resp: Partial<Response>;
  let next: NextFunction = jest.fn();
  const controller = new UsersController();
  beforeEach(() => {
    resp = {
      setHeader: jest.fn(),
      end: jest.fn(),
    };
  });
  describe('When method getAllUsersController is called', () => {
    test('Then on success resp.end should be called with the data', async () => {
      const mockResult = 'test';
      (fetchAllUsers as jest.Mock).mockReturnValue(mockResult);
      await controller.getAllUsersController(
        req as Request,
        resp as Response,
        next
      );
      expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
    });
  });
  describe('When method getUserController is called', () => {
    test('Then on success resp.end should be called with the data', async () => {
      const mockResult = { user: 'test' };
      req = { params: { name: 'te' } };
      (searchUser as jest.Mock).mockReturnValue(mockResult);
      await controller.getUserController(
        req as Request,
        resp as Response,
        next
      );
      expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
    });
  });
  describe('When method postUserController is called', () => {
    test('Then on success resp.end should be called with the data', async () => {
      const mockResult = { user: 'test' };
      req = { body: { userName: 'test' } };
      (searchUser as jest.Mock).mockReturnValue(null);
      (addUser as jest.Mock).mockReturnValue(mockResult);
      await controller.postUserController(
        req as Request,
        resp as Response,
        next
      );
      expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
    });
  });
  describe('When method patchAddUserCharacterLikeController is called', () => {
    test('Then on success resp.end should be called with the data', async () => {
      const mockResult = { success: true };
      req = { body: { characterId: '1111111', userId: 'testId' } };
      (addUserLiked as jest.Mock).mockReturnValue(true);
      await controller.patchAddUserCharacterLikeController(
        req as Request,
        resp as Response,
        next
      );
      expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
    });
  });
  describe('When method patchRemoveUserCharacterLikeController is called', () => {
    test('Then on success resp.end should be called with the data', async () => {
      const mockResult = { success: true };
      req = { body: { characterId: '1111111', userId: 'testId' } };
      (removeUserLiked as jest.Mock).mockReturnValue(true);
      await controller.patchRemoveUserCharacterLikeController(
        req as Request,
        resp as Response,
        next
      );
      expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
    });
  });
});
