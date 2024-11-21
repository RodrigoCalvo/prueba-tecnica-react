import { PAGE_SIZE } from '../config/apiConfig';
import { CharactersListVM } from '../models/characters';
import { MarvelServiceCharactersListVM } from '../models/marvel-service';

export const charactersParser = (
  serviceData: MarvelServiceCharactersListVM
): CharactersListVM => ({
  attributionText: serviceData['attributionText'],
  data: serviceData['data']?.['results']?.map((serviceChar) => ({
    id: serviceChar['id'],
    name: serviceChar['name'],
    description: serviceChar['description'],
    image: `${serviceChar['thumbnail']?.['path']}.${serviceChar['thumbnail']?.['extension']}`,
    comics: {
      count: {
        total: serviceChar['comics']?.['available'],
        displayed: serviceChar['comics']?.['returned'],
      },
      titles: serviceChar['comics']?.['items']?.map(
        (serviceComic) => serviceComic['name']
      ),
    },
  })),
  pagination: {
    elements: serviceData['data']?.['total'],
    page: serviceData['data']['offset'] / PAGE_SIZE,
    totalPages: Math.ceil(serviceData['data']?.['total'] / PAGE_SIZE),
  },
});
