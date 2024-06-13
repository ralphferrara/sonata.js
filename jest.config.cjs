module.exports = {
      rootDir: "./",
      moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
      },
      transform: {
        '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
      },
      testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js|jsx)$',
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
      transformIgnorePatterns: [
        '/node_modules/(?!file-type|strtok3|peek-readable|token-types)',
      ],
      setupFiles: ['./jest.setup.js'],
    };
    