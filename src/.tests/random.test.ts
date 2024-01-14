import random from '../sonata/utils/random';

describe('Random Utils', () => {
      describe('uuid', () => {
            it('should generate a valid UUID', () => {
                  const uuid = random.uuid();
                  expect(uuid).toMatch(/^[a-f0-9]{64}$/i);
            });
      });

      describe('hash', () => {
            it('should generate a valid hash', () => {
                  const input = 'test';
                  const salt = 'salt';
                  const hash = random.hash(input, salt);
                  expect(hash).toMatch(/^[a-f0-9]{64}$/i);
            });
      });

      describe('string', () => {
            it('should generate a string of the specified length', () => {
                  const length = 10;
                  const generatedString = random.string(length);
                  expect(generatedString.length).toBe(length);
            });

            it('should generate a string with alphanumeric characters by default', () => {
                  const generatedString = random.string();
                  expect(generatedString).toMatch(/^[a-z0-9]+$/i);
            });

            it('should generate a string with only alphabetic characters', () => {
                  const type = 'alpha';
                  const generatedString = random.string(10, type);
                  expect(generatedString).toMatch(/^[a-z]+$/i);
            });

            it('should generate a string with only numeric characters', () => {
                  const type = 'numeric';
                  const generatedString = random.string(10, type);
                  expect(generatedString).toMatch(/^[0-9]+$/i);
            });

            it('should generate a string with alphanumeric and symbols characters', () => {
                  const type = 'alphanumeric';
                  const generatedString = random.string(10, type);
                  expect(generatedString).toMatch(/^[a-z0-9]+$/i);
            });

            it('should generate a string with symbols characters', () => {
                  const type = 'symbols';
                  const generatedString = random.string(10, type);
                  expect(generatedString).toMatch(/^[!@#$%&+?]+$/i);
            });
      });

      describe('number', () => {
            it('should generate a number within the specified range', () => {
                  const min = 10;
                  const max = 20;
                  const generatedNumber = random.number(min, max);
                  expect(generatedNumber).toBeGreaterThanOrEqual(min);
                  expect(generatedNumber).toBeLessThanOrEqual(max);
            });

            it('should generate a number between 0 and 99999 by default', () => {
                  const generatedNumber = random.number();
                  expect(generatedNumber).toBeGreaterThanOrEqual(0);
                  expect(generatedNumber).toBeLessThanOrEqual(99999);
            });
      });
});
