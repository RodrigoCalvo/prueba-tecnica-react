export type ComicsListVM = {
  attributionText: string;
  data: Array<ComicVM>;
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
