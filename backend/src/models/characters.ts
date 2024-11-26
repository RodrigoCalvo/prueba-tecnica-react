export type CharactersListVM = {
  attributionText: string;
  data: Array<CharacterVM>;
  pagination: {
    elements: number;
    page: number;
    totalPages: number;
  };
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

export type CharacterVM = {
  id: number;
  name: string;
  description: string;
  image: string;
  comics: {
    total: number;
    displayed: number;
  };
} & CharacterDbVM;

export type CharacterDbVM = {
  id: number;
  comments: Array<Comment>;
  ratings: Array<Rating>;
};
