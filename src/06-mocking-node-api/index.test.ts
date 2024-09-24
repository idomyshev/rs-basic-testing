import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import * as fs from 'fs';
import path from 'path';

const generateRandomString = (length = 10) => {
  let resultString = '';
  const characters =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 1; i <= length; i++) {
    resultString += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }
  return resultString;
};

const generateRandomPath = (length = 5) => {
  let path = '';
  for (let i = 1; i <= length; i++) {
    path += `/${generateRandomString(5)}`;
  }

  return `${path}.${generateRandomString()}`;
};

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const spyFunc = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    const delay = 2000;
    doStuffByTimeout(callback, delay);
    expect(spyFunc).toHaveBeenCalledWith(callback, delay);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, 2000);

    jest.advanceTimersByTime(900);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1100);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const spyFunc = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    const delay = 100;
    doStuffByInterval(callback, delay);
    expect(spyFunc).toHaveBeenCalledWith(callback, delay);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();

    doStuffByInterval(callback, 100);

    jest.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalledTimes(10);
  });
});

jest.mock('fs');
jest.mock('fs/promises', () => {
  const originalModule = jest.requireActual<typeof fs>('fs/promises');
  return {
    ...originalModule,
    readFile: (): Promise<string> => {
      return new Promise((resolve) => {
        resolve(generateRandomString(50));
      });
    },
  };
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const filePath = generateRandomPath();
    const spyFunc = jest.spyOn(path, 'join');
    await readFileAsynchronously(filePath);
    expect(spyFunc).toHaveBeenCalledWith(expect.anything(), filePath);
    spyFunc.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    const result = await readFileAsynchronously(generateRandomPath());
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    const data = await readFileAsynchronously(generateRandomPath());
    expect(typeof data).toBe('string');
  });
});
