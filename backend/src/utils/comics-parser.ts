import { PAGE_SIZE } from '../config/apiConfig';
import { ComicsListVM, ComicVM } from '../models/comics';
import {
  MarvelServiceListVM,
  MarvelServiceComicDataVM,
} from '../models/marvel-service';

const comicParser = (serviceData: MarvelServiceComicDataVM): ComicVM => ({
  id: serviceData?.['id'],
  title: serviceData?.['title'],
  description: serviceData?.['description'] || '',
  thumbnail: `${serviceData?.thumbnail?.['path']}.${serviceData?.thumbnail?.['extension']}`,
});

export const comicsListParser = (
  serviceData: MarvelServiceListVM<MarvelServiceComicDataVM>
): ComicsListVM => ({
  attributionText: serviceData['attributionText'],
  data: serviceData['data']?.['results']?.map(comicParser),
  pagination: {
    elements: serviceData['data']?.['total'],
    page: serviceData['data']['offset'] / PAGE_SIZE,
    totalPages: Math.ceil(serviceData['data']?.['total'] / PAGE_SIZE),
  },
});
