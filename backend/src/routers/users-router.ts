import { Router } from 'express';
import { UsersController } from '../controllers/users-controller';

export const usersRouter = Router();

const usersController = new UsersController();

usersRouter.get('/:name', usersController.getUserController);
usersRouter.post('/', usersController.postUserController);
usersRouter.patch(
  '/likes/add',
  usersController.patchAddUserCharacterLikeController
);
usersRouter.patch(
  '/likes/remove',
  usersController.patchRemoveUserCharacterLikeController
);
