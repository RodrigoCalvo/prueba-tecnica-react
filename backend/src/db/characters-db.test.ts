import {
  fetchCharacters,
  fetchCharacter,
  fetchCharacterComics,
  saveCharacter,
  saveComment,
  deleteComment,
  saveRating,
  modifyRating,
} from './characters-db';
jest.mock('./marvel-service-db', () => ({
  fetchMarvel: jest.fn().mockResolvedValue('marvelData'),
}));
jest.mock('../utils/filesystem', () => ({
  readData: jest.fn(),
  writeData: jest.fn(),
}));
import { readData } from '../utils/filesystem';

const testBatch: Array<{
  testFunction: (...args: any[]) => any;
  [key: string]: any;
}> = [
  {
    testFunction: fetchCharacters,
    params: [],
    readDataMock: 'dbData',
    expected: { marvelData: 'marvelData', dbData: 'dbData' },
  },
  {
    testFunction: fetchCharacter,
    params: [1],
    readDataMock: [{ id: 1 }],
    expected: { marvelData: 'marvelData', dbData: { id: 1 } },
  },
  {
    testFunction: fetchCharacterComics,
    params: [1],
    readDataMock: [],
    expected: 'marvelData',
  },
  {
    testFunction: saveCharacter,
    params: [{ test: 'test' }],
    readDataMock: [],
    expected: true,
  },
  {
    testFunction: saveComment,
    params: [1, { test: 'test' }],
    readDataMock: [],
    expected: { test: 'test' },
  },
  {
    testFunction: saveRating,
    params: [1, { test: 'test' }],
    readDataMock: [],
    expected: { test: 'test' },
  },
  {
    testFunction: modifyRating,
    params: [1, { user: 'testUser', rating: 4 }],
    readDataMock: [{ id: 1, ratings: [{ user: 'testUser', rating: 2 }] }],
    expected: { user: 'testUser', rating: 4 },
  },
  {
    testFunction: deleteComment,
    params: [1, 'id'],
    readDataMock: [{ id: 1, comments: [{ id: 'id' }] }],
    expected: true,
  },
];

testBatch.forEach((testItem) => {
  describe(`Given ${testItem.testFunction.name} function`, () => {
    describe(`When calling it with params ${testItem.params.toString()}`, () => {
      test(`Then it should return ${testItem.expected.toString()}`, async () => {
        (readData as jest.Mock).mockReturnValue(testItem.readDataMock);
        const result = await testItem.testFunction(...testItem.params);
        expect(result).toEqual(testItem.expected);
      });
    });
  });
});
