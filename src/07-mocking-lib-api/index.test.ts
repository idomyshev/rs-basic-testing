//import axios from 'axios';
//import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  // test('should create instance with provided base url', async () => {
  //   const spyFunc = jest.spyOn(axios, 'create');
  //   await throttledGetDataFromApi('posts');
  //   expect(spyFunc).toHaveBeenCalledWith({
  //     baseURL: 'https://jsonplaceholder.typicode.com',
  //   });
  // });

  test('should perform request to correct provided url', async () => {
    // TODO Needed to use mocking here and in other 2 methods in this file.
    // const spyFunc = jest.spyOn(axios, 'get');
    // // await throttledGetDataFromApi('posts');
    // // expect(spyFunc).toHaveBeenCalled();
    // const mockUserData = { id: 1, name: 'John Doe' };
    //
    // // Mock the axios.get method to resolve with mockUserData
    //
    // // Call the function
    // const data = await getUserData(1);
    //
    // // Assert that axios.get was called with the correct URL
    // expect(axios.get).toHaveBeenCalledWith('/api/users/1');
    //
    // // Assert that the returned data is the mockUserData
    // expect(data).toEqual(mockUserData);
  });

  test('should return response data', async () => {
    // const res = await throttledGetDataFromApi('posts');
    // expect(res.length).not.toBe(0);
  });
});
