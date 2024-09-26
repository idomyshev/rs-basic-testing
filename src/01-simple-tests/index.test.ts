import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 2, b: 3, action: Action.Add });
    expect(result).toBe(5);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 3, action: Action.Subtract });
    expect(result).toBe(7);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 8, b: 3, action: Action.Multiply });
    expect(result).toBe(24);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 44, b: 4, action: Action.Divide });
    expect(result).toBe(11);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toBe(8);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 2, b: 0, action: '&' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: 'a', b: 'b', action: '+' });
    expect(result).toBeNull();
  });
});
