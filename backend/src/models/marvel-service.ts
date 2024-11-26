type MarvelServiceCollectionVM<T> = {
  available: number;
  returned: number;
  collectionURI: string;
  items: Array<T>;
};

export type MarvelServiceCharacterDataVM = {
  id: number;
  name: string;
  description: string;
  modified: string;
  resourceURI: string;
  urls: Array<{ type: string; url: string }>;
  thumbnail: { path: string; extension: string };
  comics: MarvelServiceCollectionVM<{ resourceURI: string; name: string }>;
  stories: MarvelServiceCollectionVM<{
    resourceURI: string;
    name: string;
    type: string;
  }>;
  events: MarvelServiceCollectionVM<{ resourceURI: string; name: string }>;
  series: MarvelServiceCollectionVM<{ resourceURI: string; name: string }>;
};

export type MarvelServiceComicDataVM = {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string | null;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: Array<{
    type: string;
    language: string;
    text: string;
  }>;
  resourceURI: string;
  urls: Array<{ type: string; url: string }>;
  series: { resourceURI: string; name: string };
  variants: Array<{ resourceURI: string; name: string }>;
  collections: Array<{ resourceURI: string; name: string }>;
  collectedIssues: Array<{ resourceURI: string; name: string }>;
  dates: Array<{ type: string; date: string }>;
  prices: Array<{ type: string; price: number }>;
  thumbnail: { path: string; extension: string };
  images: Array<{ path: string; extension: string }>;
  creators: MarvelServiceCollectionVM<{
    resourceURI: string;
    name: string;
    role: string;
  }>;
  characters: MarvelServiceCollectionVM<{
    resourceURI: string;
    name: string;
    role?: string;
  }>;
  stories: MarvelServiceCollectionVM<{
    resourceURI: string;
    name: string;
    type: string;
  }>;
  events: MarvelServiceCollectionVM<{ resourceURI: string; name: string }>;
};

export type MarvelServiceListVM<T> = {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Array<T>;
  };
  etag: string;
};
