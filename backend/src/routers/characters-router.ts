import { Router } from 'express';
import { CharactersController } from '../controllers/characters-controller';

export const charactersRouter = Router();
export const characterRouter = Router();

const charactersController = new CharactersController();

charactersRouter.get('/:page', charactersController.getAllCharactersController);

characterRouter.get('/:id', charactersController.getCharacterController);
characterRouter.get(
  '/comics/:id',
  charactersController.getCharacterComicsController
);
characterRouter.post(
  '/comments',
  charactersController.postCharacterCommentController
);
characterRouter.post(
  '/ratings',
  charactersController.postCharacterRatingController
);
characterRouter.patch(
  '/ratings',
  charactersController.patchCharacterRatingController
);
characterRouter.delete(
  '/comments',
  charactersController.deleteCharacterCommentController
);
