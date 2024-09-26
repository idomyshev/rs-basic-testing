import { throttledGetDataFromApi } from './index';
import axios from 'axios';

const generateRandomString = (length = 10) => {
  let resultString = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  for (let i = 1; i <= length; i++) {
    resultString += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }
  return resultString;
};

jest.mock('axios');

jest.mock('lodash', () => {
  const originalModule = jest.requireActual<typeof axios>('lodash');
  return {
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  let expectedRelativePath: string;
  let expectedResponse: string;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    expectedRelativePath = generateRandomString();
    expectedResponse = generateRandomString();
  });

  test('should create instance with provided base url', async () => {
    const mockAxiosGet = jest
      .fn()
      .mockResolvedValue({ data: expectedResponse });

    (axios.create as jest.Mock).mockReturnValue({
      get: mockAxiosGet,
    });

    await throttledGetDataFromApi(expectedRelativePath);
    const spyFunc = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi(expectedRelativePath);

    expect(spyFunc).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: expect.stringMatching(/^(http|https):\/\//),
      }),
    );
  });

  test('should perform request to correct provided url', async () => {
    const mockAxiosGet = jest
      .fn()
      .mockResolvedValue({ data: expectedResponse });

    (axios.create as jest.Mock).mockReturnValue({
      get: mockAxiosGet,
    });

    await throttledGetDataFromApi(expectedRelativePath);

    expect(mockAxiosGet).toHaveBeenCalledWith(expectedRelativePath);
  });

  test('should return response data', async () => {
    const mockAxiosGet = jest
      .fn()
      .mockResolvedValue({ data: expectedResponse });

    (axios.create as jest.Mock).mockReturnValue({
      get: mockAxiosGet,
    });

    const response = await throttledGetDataFromApi(expectedRelativePath);

    expect(response).toBe(expectedResponse);
  });
});
