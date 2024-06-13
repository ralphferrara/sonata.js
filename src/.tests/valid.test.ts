import valid from '../sonata/utils/valid.js';

jest.mock('../sonata/app.js', () => ({
      __esModule: true, // this property makes it work
      default: jest.fn().mockReturnValue({
        config: {
          moderate: {
            banned: {
              admin: ['adminword1', 'adminword2'],
              offensive: ['offensiveword1', 'offensiveword2'],
            },
          },
        },
      }),
    }));

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
        it('should return "VUN000" for null username', () => {
          const result = valid.username(null);
          expect(result).toBe('VUN000');
        });
    
        it('should return "VUN000" for undefined username', () => {
          const result = valid.username(undefined);
          expect(result).toBe('VUN000');
        });
    
        it('should return "VUN000" for short usernames', () => {
          const result = valid.username('abc');
          expect(result).toBe('VUN000');
        });
    
        it('should return "VUN001" for invalid characters in username', () => {
          const result = valid.username('invalid*name');
          expect(result).toBe('VUN001');
        });
    
        it('should return "VUN004" for usernames containing banned admin words', () => {
          const result = valid.username('adminword1');
          expect(result).toBe('VUN004');
        });
    
        it('should return "VUN005" for usernames containing banned offensive words', () => {
          const result = valid.username('offensiveword1');
          expect(result).toBe('VUN005');
        });
    
        it('should return true for valid username', () => {
          const result = valid.username('validusername');
          expect(result).toBe(true);
        });
    
        it('should return "VUN001" for usernames containing spaces', () => {
          const result = valid.username('john doe');
          expect(result).toBe('VUN001');
        });
    
        it('should return "VUN001" for usernames containing special characters', () => {
          const result = valid.username('john@doe');
          expect(result).toBe('VUN001');
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
    
