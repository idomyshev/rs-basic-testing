import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const spySetTimeout = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    const delay = 2000;
    doStuffByTimeout(callback, delay);
    expect(spySetTimeout).toHaveBeenCalledWith(callback, delay);
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
    const spySetInterval = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    const delay = 100;
    doStuffByInterval(callback, delay);
    expect(spySetInterval).toHaveBeenCalledWith(callback, delay);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();

    doStuffByInterval(callback, 100);

    jest.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalledTimes(10);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const filePath = './index.ts';
    const spyFunc = jest.spyOn(path, 'join');
    await readFileAsynchronously(filePath);
    expect(spyFunc).toHaveBeenCalledWith(expect.anything(), filePath);
    spyFunc.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    const filePath = Math.random().toString();
    expect(await readFileAsynchronously(filePath)).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const filePath = './index.ts';
    expect(typeof (await readFileAsynchronously(filePath))).toBe('string');
  });
});
