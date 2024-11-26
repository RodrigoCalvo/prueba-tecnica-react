import { PAGE_SIZE } from '../config/apiConfig';
import {
  CharacterDbVM,
  CharactersListVM,
  CharacterVM,
} from '../models/characters';
import {
  MarvelServiceCharacterDataVM,
  MarvelServiceListVM,
} from '../models/marvel-service';

const characterParser = (
  serviceData: MarvelServiceCharacterDataVM,
  dbData: CharacterDbVM | undefined
): CharacterVM => ({
  id: serviceData?.['id'],
  name: serviceData?.['name'],
  description: serviceData?.['description'],
  image: `${serviceData?.['thumbnail']?.['path']}.${serviceData?.['thumbnail']?.['extension']}`,
  comics: {
    total: serviceData?.['comics']?.['available'],
    displayed: serviceData?.['comics']?.['returned'],
  },
  comments: dbData?.['comments'] || [],
  ratings: dbData?.['ratings'] || [],
});

export const characterListParser = (
  serviceData: MarvelServiceListVM<MarvelServiceCharacterDataVM>,
  dbData: Array<CharacterDbVM> | undefined
): CharactersListVM => ({
  attributionText: serviceData['attributionText'],
  data: serviceData['data']?.['results']?.map((serviceCharacter) => {
    const dbCharacter = dbData?.find(
      (dbChar) => dbChar.id === serviceCharacter.id
    );
    return characterParser(serviceCharacter, dbCharacter);
  }),
  pagination: {
    elements: serviceData['data']?.['total'],
    page: serviceData['data']['offset'] / PAGE_SIZE,
    totalPages: Math.ceil(serviceData['data']?.['total'] / PAGE_SIZE),
  },
});

export const singleCharacterParser = (
  serviceData: MarvelServiceListVM<MarvelServiceCharacterDataVM>,
  dbData: CharacterDbVM | undefined
): {
  attributionText: string;
  character: CharacterVM;
} => ({
  attributionText: serviceData['attributionText'],
  character: characterParser(serviceData['data']?.['results']?.[0], dbData),
});
