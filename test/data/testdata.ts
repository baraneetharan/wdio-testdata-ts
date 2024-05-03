// testdataxlsx.ts
import { User } from './user';
import Excel from 'exceljs';
import * as path from 'path';
import { fileURLToPath } from 'url';

class TestData {

  public async readUserData() {
    const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
    const __dirname = path.dirname(__filename); // get the name of the directory
    const filePath = path.resolve(__dirname, 'testdata.xlsx'); // getthe filepath

    const workbook = new Excel.Workbook();    
    const content = await workbook.xlsx.readFile(filePath);
    // const worksheet = content.worksheets[0];
    const worksheet = content.getWorksheet('user');

    if (!worksheet) {
      throw new Error('Worksheet not found');
    }

    const numberOfRows = worksheet?.rowCount
    console.log('********* numberOfRows ********' + numberOfRows)

    let data: User[] = [];

    worksheet?.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      const rowData: User = {
        username: row.getCell(1).value as string,
        password: row.getCell(2).value as string,
        expected: row.getCell(3).value as string
      };
      if (rowNumber > 1) { // Skip header row
        data.push(rowData);
      }
    });
    return data;

  }
}

export default new TestData();
