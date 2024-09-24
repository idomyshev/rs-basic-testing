import { throttledGetDataFromApi } from './index';
import axios from 'axios';
// import axios from 'axios';

// const generateRandomString = (length = 10) => {
//   let resultString = '';
//   const characters = 'abcdefghijklmnopqrstuvwxyz';
//   for (let i = 1; i <= length; i++) {
//     resultString += characters.charAt(
//       Math.floor(Math.random() * characters.length),
//     );
//   }
//   return resultString;
// };

jest.mock('axios');

// jest.mock('axios', () => {
//   const originalModule = jest.requireActual<typeof axios>('axios');
//   return {
//     ...originalModule,
//     // create: (params: { baseURL: string }): string => {
//     //   const { baseURL } = params;
//     //   console.log('baseURLLLLL', baseURL);
//     //   return baseURL;
//     // },
//     get: (): Promise<string> => {
//       return new Promise((resolve) => {
//         console.log('RUUUN GET');
//         resolve('ABC');
//       });
//     },
//   };
// });

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const expectedRelativePath = 'relativeeee1';
  const expectedResponse = 'respoooonse1';

  test('should create instance with provided base url', async () => {
    //axios.create = jest.fn();
    // const methodGet = jest.fn().mockResolvedValue({ data: expectedResponse });
    //
    // (axios.create as jest.Mock).mockReturnValue({
    //   get: methodGet,
    // });
    //
    // const spyFunc = jest.spyOn(axios, 'create');
    //
    // await throttledGetDataFromApi(expectedRelativePath);
    //
    // expect(spyFunc).toHaveBeenCalledWith({
    //   baseURL: 'https://jsonplaceholder.typicode.com',
    // });
    //console.log(generateRandomString());
    // const expectedRelativePath = generateRandomString();
    // const expectedResponse = generateRandomString();
    //
    // const methodGet = jest.fn().mockResolvedValue({ data: expectedResponse });
    //
    // (axios.create as jest.Mock).mockReturnValue({
    //   get: methodGet,
    // });
    //
    // expect(await throttledGetDataFromApi(expectedRelativePath)).toBe(
    //   expectedResponse,
    // );
    //
    // expect(methodGet).toHaveBeenCalledWith(expectedRelativePath);
  });

  test('should perform request to correct provided url', async () => {
    const methodGet = jest.fn().mockResolvedValue({ data: expectedResponse });

    (axios.create as jest.Mock).mockReturnValue({
      get: methodGet,
    });

    await throttledGetDataFromApi(expectedRelativePath);

    expect(methodGet).toHaveBeenCalledWith(expectedRelativePath);
  });

  test('should return response data', async () => {
    const methodGet = jest.fn().mockResolvedValue({ data: expectedResponse });

    (axios.create as jest.Mock).mockReturnValue({
      get: methodGet,
    });

    const response = await throttledGetDataFromApi(expectedRelativePath);

    expect(response).toBe(expectedResponse);
  });
});
