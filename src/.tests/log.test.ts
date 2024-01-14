import Log from '../sonata/utils/log';

describe('Log [Pretty unneccesary]', () => {
      let consoleLogSpy: jest.SpyInstance;

      beforeEach(() => {
            consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
      });

      afterEach(() => {
            consoleLogSpy.mockRestore();
      });

      it('should log an info message', () => {
            const log = new Log('Info message', 'info');
            expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('INFO'));
      });

      it('should log a warning message', () => {
            const log = new Log('Warning message', 'warn');
            expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('WARN'));
      });
});
