import { CharacterVM } from './characters';

export type User = {
  id: string;
  name: string;
  likedChararacters: Array<{ id: CharacterVM['id'] }>;
};
