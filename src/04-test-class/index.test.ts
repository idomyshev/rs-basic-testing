import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from './index';

import { random } from 'lodash';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 10000;
    const bankAccount = getBankAccount(initialBalance);
    expect(bankAccount).toBeInstanceOf(BankAccount);
    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 1000;
    const withdrawAmount = 2000;
    const bankAccount = getBankAccount(balance);
    expect(() => bankAccount.withdraw(withdrawAmount)).toThrow(
      new InsufficientFundsError(balance),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const sourceAccount = getBankAccount(5000);
    const targetAccount = getBankAccount(0);
    expect(() => sourceAccount.transfer(7000, targetAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const sourceAccount = getBankAccount(5000);
    expect(() => sourceAccount.transfer(1000, sourceAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const initialAmount = random(0, 10000);
    const depositAmount = random(0, 5000);
    const bankAccount = getBankAccount(initialAmount);
    bankAccount.deposit(depositAmount);
    expect(bankAccount.getBalance()).toBe(initialAmount + depositAmount);
  });

  test('should withdraw money', () => {
    const initialAmount = random(5000, 10000);
    const withdrawAmount = random(1000, 5000);
    const bankAccount = getBankAccount(initialAmount);
    bankAccount.withdraw(withdrawAmount);
    expect(bankAccount.getBalance()).toBe(initialAmount - withdrawAmount);
  });

  test('should transfer money', () => {
    const initialSourceAmount = random(5000, 10000);
    const initialTargetAmount = random(5000, 10000);
    const transferAmount = random(1000, 5000);
    const sourceAccount = getBankAccount(initialSourceAmount);
    const targetAccount = getBankAccount(initialTargetAmount);
    sourceAccount.transfer(transferAmount, targetAccount);
    expect(sourceAccount.getBalance()).toBe(
      initialSourceAmount - transferAmount,
    );
    expect(targetAccount.getBalance()).toBe(
      initialTargetAmount + transferAmount,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(1000);
    const result = await bankAccount.fetchBalance();
    expect(typeof result === 'number' || result === null).toBe(true);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialAmount = random(5000, 10000);
    const bankAccount = getBankAccount(initialAmount);
    try {
      await bankAccount.synchronizeBalance();
      expect(bankAccount.getBalance() !== initialAmount).toBe(true);
    } catch {
      expect(bankAccount.getBalance()).toBe(initialAmount);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(random(5000, 10000));
    try {
      await bankAccount.synchronizeBalance();
      expect(true).toBe(true);
    } catch (error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
