// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 10, b: 2, action: Action.Subtract, expected: 8 },
  { a: 2, b: 3, action: Action.Subtract, expected: -1 },
  { a: 30, b: 2, action: Action.Subtract, expected: 28 },
  { a: 1, b: 1, action: Action.Multiply, expected: 1 },
  { a: 2, b: 20, action: Action.Multiply, expected: 40 },
  { a: 3, b: 12, action: Action.Multiply, expected: 36 },
  { a: 12, b: 3, action: Action.Divide, expected: 4 },
  { a: 15, b: 3, action: Action.Divide, expected: 5 },
  { a: 30, b: 2, action: Action.Divide, expected: 15 },
];

describe('simpleCalculator', () => {
  test.each(testCases)('should do calculations correctly', (item) => {
    const { a, b, action, expected } = item;
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(expected);
  });
});
