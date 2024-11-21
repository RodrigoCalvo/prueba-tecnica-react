export type CharacterVM = {
  id: number;
  name: string;
  description: string;
  image: string;
  comics: {
    count: { total: number; displayed: number };
    titles: Array<string>;
  };
};

export type CharactersListVM = {
  attributionText: string;
  data: Array<CharacterVM>;
  pagination: {
    elements: number;
    page: number;
  };
};
