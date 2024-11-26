import {
  fetchAllUsers,
  searchUser,
  addUser,
  addUserLiked,
  removeUserLiked,
  deleteUser,
} from './users-db';

jest.mock('../utils/filesystem', () => ({
  readData: jest.fn(),
  writeData: jest.fn(),
}));
import { readData } from '../utils/filesystem';
jest.mock('../utils/ids-generator', () => ({
  generateUserId: jest.fn().mockReturnValue('1'),
}));

const testBatch: Array<{
  testFunction: (...args: any[]) => any;
  [key: string]: any;
}> = [
  {
    testFunction: fetchAllUsers,
    params: [],
    readDataMock: 'data',
    expected: 'data',
  },
  {
    testFunction: searchUser,
    params: ['testUser'],
    readDataMock: [{ id: 'test', name: 'testUser' }],
    expected: { id: 'test', name: 'testUser' },
  },
  {
    testFunction: addUser,
    params: ['testUser'],
    readDataMock: [],
    expected: { id: '1', name: 'testUser', likedCharacters: [] },
  },
  {
    testFunction: addUserLiked,
    params: ['1', 1111111],
    readDataMock: [{ id: '1', likedCharacters: [] }],
    expected: true,
  },
  {
    testFunction: removeUserLiked,
    params: ['1', 1111111],
    readDataMock: [{ id: '1', likedCharacters: [1111111] }],
    expected: true,
  },
  {
    testFunction: deleteUser,
    params: ['1'],
    readDataMock: [],
    expected: undefined,
  },
];

testBatch.forEach((testItem) => {
  describe(`Given ${testItem.testFunction.name} function`, () => {
    describe(`When calling it with params ${testItem.params.toString()}`, () => {
      test(`Then it should return ${testItem.expected?.toString()}`, async () => {
        (readData as jest.Mock).mockReturnValue(testItem.readDataMock);
        const result = await testItem.testFunction(...testItem.params);
        expect(result).toEqual(testItem.expected);
      });
    });
  });
});
