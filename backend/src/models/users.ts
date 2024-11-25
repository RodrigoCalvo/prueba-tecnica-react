import { CharacterVM } from './characters';

export type User = {
  id: string;
  name: string;
  likedCharacters: Array<{ id: CharacterVM['id'] }>;
};
