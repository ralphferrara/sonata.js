import valid from '../sonata/utils/valid';

describe('Valid', () => {
      describe('phone', () => {
            it('should return false for undefined value', () => {
                  expect(valid.phone(undefined)).toBe(false);
            });

            it('should return false for value with less than 9 characters', () => {
                  expect(valid.phone('12345678')).toBe(false);
            });

            it('should return true for valid phone number', () => {
                  expect(valid.phone('+123456789')).toBe(true);
            });

            it('should return false for invalid phone number', () => {
                  expect(valid.phone('abc123')).toBe(false);
            });
      });

      describe('email', () => {
            it('should return true for valid email', () => {
                  expect(valid.email('test@example.com')).toBe(true);
            });

            it('should return false for invalid email', () => {
                  expect(valid.email('test@example')).toBe(false);
            });
      });

      describe('username', () => {
            it('should return true for valid username', () => {
                  expect(valid.username('john_doe')).toBe(true);
            });

            it('should return false for invalid username', () => {
                  expect(valid.username('john doe')).toBe(false);
            });
      });

      describe('verification', () => {
            it('should return false for undefined value', () => {
                  expect(valid.verification(undefined)).toBe(false);
            });

            it('should return false for value with length other than 6', () => {
                  expect(valid.verification('12345')).toBe(false);
            });

            it('should return false for value with non-numeric characters', () => {
                  expect(valid.verification('1234a6')).toBe(false);
            });

            it('should return false for value less than 100000', () => {
                  expect(valid.verification('99999')).toBe(false);
            });

            it('should return false for value greater than 999999', () => {
                  expect(valid.verification('1000000')).toBe(false);
            });

            it('should return true for valid verification code', () => {
                  expect(valid.verification('123456')).toBe(true);
            });
      });

      describe('blank', () => {
            it('should return false for undefined value', () => {
                  expect(valid.blank(undefined)).toBe(false);
            });

            it('should return false for empty string', () => {
                  expect(valid.blank('')).toBe(false);
            });

            it('should return true for non-empty string', () => {
                  expect(valid.blank('hello')).toBe(true);
            });
      });

      describe('inArray', () => {
            it('should return false for undefined value', () => {
                  expect(valid.inArray(undefined, ['apple', 'banana', 'cherry'])).toBe(false);
            });

            it('should return false for value not in the array', () => {
                  expect(valid.inArray('orange', ['apple', 'banana', 'cherry'])).toBe(false);
            });

            it('should return true for value in the array', () => {
                  expect(valid.inArray('banana', ['apple', 'banana', 'cherry'])).toBe(true);
            });
      });
});
