
import  JSONInspector         from '../sonata/utils/json.inspector';
import * as fs                from 'fs';
import path                   from 'path';

describe('JSONInspector', () => {

      it('check.json should have error count of 0', async () => {

            const jvalContent = await fs.promises.readFile(path.join(process.cwd(), 'src/.tests/assets/check.jval'), 'utf-8');
            const checkJSON = JSON.parse(jvalContent);

            const actualContent = await fs.promises.readFile(path.join(process.cwd(), 'src/.tests/assets/check.json'), 'utf-8');
            const actualJSON = JSON.parse(actualContent);

            const jval = new JSONInspector();
            jval.init(checkJSON, actualJSON);

            const errorCount = jval.errors.length;
            expect(errorCount).toBe(0);

      });

      it('fail.json should have error count of 11', async () => {

            const jvalContent = await fs.promises.readFile(path.join(process.cwd(), 'src/.tests/assets/check.jval'), 'utf-8');
            const checkJSON = JSON.parse(jvalContent);

            const actualContent = await fs.promises.readFile(path.join(process.cwd(), 'src/.tests/assets/fail.json'), 'utf-8');
            const actualJSON = JSON.parse(actualContent);

            const jval = new JSONInspector();
            jval.init(checkJSON, actualJSON);

            const errorCount = jval.errors.length;
            //console.log(jval.errors);
            expect(errorCount).toBe(11);

      });      
});
