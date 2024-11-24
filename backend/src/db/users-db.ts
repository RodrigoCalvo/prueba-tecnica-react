import path from 'path';
import { User } from '../models/users';
import { readData, writeData } from '../utils/filesystem';
import { generateUserId } from '../utils/ids-generator';

const DATA_FILE = path.join(__dirname, '/json/users.json');

const fetchAllUsers = (): Array<User> | undefined => {
  return readData(DATA_FILE) || [];
};

const searchUser = (name: string): User | undefined => {
  const data = readData<Array<User>>(DATA_FILE) || [];
  return data.find((user) => user.name === name);
};

const addUser = (userName: string): User => {
  const newUser: User = {
    id: generateUserId(),
    name: userName,
    likedChararacters: [],
  };
  const data = readData<Array<User>>(DATA_FILE) || [];
  const newData = [...data, newUser];
  writeData<Array<User>>(DATA_FILE, newData);
  return newUser;
};

const addUserLiked = (userId: string, characterLikedId: number): boolean => {
  const data = readData<Array<User>>(DATA_FILE) || [];
  const userIndex = data.findIndex((user) => user.id === userId);

  if (userIndex === -1) return false;
  if (
    data[userIndex].likedChararacters.some(
      (char) => char.id === characterLikedId
    )
  )
    return true;

  const newUser: User = {
    ...data[userIndex],
    likedChararacters: [
      ...data[userIndex].likedChararacters,
      { id: characterLikedId },
    ],
  };
  const newData = [...data];
  newData[userIndex] = newUser;
  writeData<Array<User>>(DATA_FILE, newData);
  return true;
};

const removeUserLiked = (userId: string, characterLikedId: number): boolean => {
  const data = readData<Array<User>>(DATA_FILE) || [];
  const userIndex = data.findIndex((user) => user.id === userId);

  if (userIndex === -1) return false;
  if (
    !data[userIndex].likedChararacters.some(
      (char) => char.id === characterLikedId
    )
  )
    return true;

  const newUser: User = {
    ...data[userIndex],
    likedChararacters: data[userIndex].likedChararacters.filter(
      (char) => char.id !== characterLikedId
    ),
  };
  const newData = [...data];
  newData[userIndex] = newUser;
  writeData<Array<User>>(DATA_FILE, newData);
  return true;
};

const deleteUser = (userId: string) => {
  const data = readData<Array<User>>(DATA_FILE) || [];
  const filteredData = data.filter((user) => user.id !== userId);
  writeData<Array<User>>(DATA_FILE, filteredData);
};

export {
  fetchAllUsers,
  searchUser,
  addUser,
  addUserLiked,
  removeUserLiked,
  deleteUser,
};
