import * as fs from 'fs';
import CsvReadableStream from "csv-reader";
import { distributeMsisdnToChunk } from './chunkDistributingAlgorithm';

const stream1 = fs.createWriteStream('./csv_files/chunk1.csv', { flags: 'a' });
const stream2 = fs.createWriteStream('./csv_files/chunk2.csv', { flags: 'a' });
const stream3 = fs.createWriteStream('./csv_files/chunk3.csv', { flags: 'a' });

export const initialApproach = () => {
    let inputStream = fs.createReadStream('./csv_files/fullbase.csv', 'utf8');
    const startTime = performance.now();
    console.log('Synchronous Execution')
    inputStream
        .pipe(new CsvReadableStream({ parseNumbers: true}))
        .on('data', async function (row: any, ix:any) {
            const chunkNumber = distributeMsisdnToChunk(row[0]?.toString());
            if(chunkNumber === 0){
                stream1.write(`${row[0]}\n`);
            } else if(chunkNumber === 1){
                stream2.write(`${row[0]}\n`);
            } else {
                stream3.write(`${row[0]}\n`);
            }
        })
        .on('end', () => {
            stream1.end();
            stream2.end();
            stream3.end();
            const endTime = performance.now();
            console.log(endTime - startTime);
        });
}