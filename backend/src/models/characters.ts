export type CharactersListVM = {
  attributionHTML: string;
  data: Array<CharacterVM>;
  pagination: {
    elements: number;
    page: number;
    totalPages: number;
  };
};

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
