export type CharacterVM = {
  id: number;
  name: string;
  description: string;
  image: string;
  comics: {
    count: { total: number; displayed: number };
    titles: Array<string>;
  };
  comments: Array<Comment>;
  ratings: Array<Rating>;
};

export type Comment = {
  id: string;
  textContent: string;
  user: string;
};

export type Rating = {
  rating: number;
  user: string;
};

export type CharactersListVM = {
  attributionText: string;
  data: Array<CharacterVM>;
  pagination: {
    elements: number;
    page: number;
    totalPages: number;
  };
};

export type ComicVM = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
};

export type ComicsListVM = {
  attributionText: string;
  data: Array<ComicVM>;
  pagination: {
    elements: number;
    page: number;
    totalPages: number;
  };
};
