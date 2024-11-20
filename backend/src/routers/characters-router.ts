import { Router } from 'express';
import { CharactersController } from '../controllers/characters-controller';

export const charactersRouter = Router();

export const charactersController = new CharactersController();

charactersRouter.get(
  '/characters/:page',
  charactersController.getAllController
);
charactersRouter.get('/character/:id', charactersController.getController);
