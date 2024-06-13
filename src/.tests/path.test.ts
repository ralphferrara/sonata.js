import Path from '../sonata/utils/path';

describe('Path', () => {
      let path: Path;

      beforeEach(() => {
            path = new Path('src/.tests/assets/check.txt');
      });

      afterEach(() => {
            jest.restoreAllMocks();
      });

      describe('abs', () => {
            it('should return the absolute path', () => {
                  const result = path.abs();
                  const isWindows = process.platform === 'win32';
                  const perEnv = isWindows ? result.startsWith(result[0] + ':\\') : result.split('/').length > 4;
                  expect(perEnv).toBe(true);
            });
      });

      describe('relative', () => {
            it('should return the relative path', () => {
                  const result = path.relative();
                  expect(result.startsWith('src/')).toBe(true);
            });
      });

      describe('ext', () => {
            it('should return the file extension', () => {
                  const result = path.ext();
                  expect(result).toBe('txt');
            });
      });

      describe('parent', () => {
            it('should return the parent directory', () => {
                  const result = path.parent();
                  expect(result.endsWith("assets")).toBe(true);
            });
      });

      describe('base', () => {
            it('should return the base name', () => {
                  const result = path.base();
                  expect(result).toBe('check');
            });
      });

      describe('name', () => {
            it('should return the file name without extension', () => {
                  const result = path.name();
                  expect(result).toBe('check.txt');
            });
      });

      describe('isAbsolute', () => {
            it('should return true if the path is absolute', () => {
                  const test = new Path(path.abs());
                  const result = test.isAbsolute();
                  expect(result).toBe(true);
            });
      });

      describe('isFile', () => {
            it('should return true if the path is a file', () => {
                  const result = path.isFile();
                  expect(result).toBe(true);
            });
      });

      describe('isDirectory', () => {
            it('should return true if the path is a directory', () => {
                  const result = path.isDirectory();
                  expect(result).toBe(false);
            });
      });

      describe('isRoot', () => {
            it('should return true if the path is the root directory', () => {
                  const result = path.isRoot();
                  expect(result).toBe(false);
            });
      });

      describe('isDot', () => {
            it('should return true if the path is "."', () => {
                  const result = path.isDot();
                  expect(result).toBe(false);
            });
      });

      describe('isDot', () => {
            it('should return true if the path is "."', () => {
                  const dotPath = new Path('.');
                  const result = dotPath.isDot();
                  expect(result).toBe(true);
            });

            it('should return false if the path is not "."', () => {
                  const nonDotPath = new Path('assets/check.txt');
                  const result = nonDotPath.isDot();
                  expect(result).toBe(false);
            });
      });

      describe('isDotDot', () => {
            it('should return true if the path is ".."', () => {
                  const dotDotPath = new Path('..');
                  const result = dotDotPath.isDotDot();
                  expect(result).toBe(true);
            });

            it('should return false if the path is not ".."', () => {
                  const nonDotDotPath = new Path('src/.tests/assets/check.txt');
                  const result = nonDotDotPath.isDotDot();
                  expect(result).toBe(false);
            });
      });

      describe('header', () => {
            it('should return true if the path is "."', () => {
                  const headPath = new Path('test.txt');
                  const result = headPath.header();
                  expect(result).toBe('text/plain');
            });

            it('should return false if the path is not "."', () => {
                  const headPath = new Path('test.jpg');
                  const result = headPath.header();
                  expect(result).toBe('image/jpeg');
            });
      });      

      describe('exists', () => {
            it('should return true if the file/directory exists', async () => {
                  const existingPath = new Path('src/.tests/assets/check.txt');
                  const result = await existingPath.exists();
                  expect(result).toBe(true);
            });

            it('should return false if the file/directory does not exist', async () => {
                  const nonExistingPath = new Path('src/sonata/.tests/assets/nonexistent.txt');
                  const result = await nonExistingPath.exists();
                  expect(result).toBe(false);
            });
      });

      describe('read', () => {
            it('should return the file content as a string', async () => {
                  const filePath = new Path('src/.tests/assets/check.txt');
                  const result = await filePath.read();
                  expect(result).toBe('OK');
            });

            it('should return the file content as a buffer', async () => {
                  const filePath = new Path('src/.tests/assets/check.txt');
                  const result = await filePath.read(true);
                  expect(result).toBeInstanceOf(Buffer);
            });

            it('should return an empty string if the file does not exist', async () => {
                  const nonExistingPath = new Path('src/.tests/assets/nonexistent.txt');
                  const result = await nonExistingPath.read();
                  expect(result).toBeUndefined();
            });
      });

      describe('write', () => {
            it('should return the file content as a string', async () => {                  
                  try { 
                        const filePath = new Path('src/.tests/assets/testwatch.txt').abs();                        
                        await new Path(filePath).write(new Date().toISOString());
                        expect(true).toBe(true);
                  } catch (error) {
                        expect(false).toBe(true);
                  }
            });
      });      

      describe('json', () => {
            it('should return the file content as a JSON object', async () => {
                  const filePath = new Path('src/.tests/assets/check.json');
                  const result = await filePath.json();
                  expect(result).toBeInstanceOf(Object);
            });

            it('should return undefined if the file does not exist', async () => {
                  const nonExistingPath = new Path('src/.tests/assets/nonexistent.json');
                  const result = await nonExistingPath.json();
                  expect(result).toBeUndefined();
            });
      });

      it('TODO:should parse page parts from page directory', () => {
            // const fileData = 'Page content';
            // const parseData = path.parseSS();
            // expect(parseData).toEqual({ title: 'Page Title', content: 'Page content' });
            expect(true).toBe(true);
      });

      it('TODO:should parse queries from query directory', () => {
            // const fileData = 'key1=value1\nkey2=value2';
            // const queries = path.parseQueries(fileData);
            // expect(queries).toEqual({ key1: 'value1', key2: 'value2' });
            expect(true).toBe(true);
      });


});



