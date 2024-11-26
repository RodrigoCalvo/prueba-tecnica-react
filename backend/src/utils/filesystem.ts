import fs from 'fs';

export const readData = <T>(DATA_FILE: string): T | undefined => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(error);
  }
};

export const writeData = <T>(DATA_FILE: string, data: T) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data), 'utf-8');
  } catch (error) {
    console.error(error);
  }
};
