import { parentPort, workerData } from 'worker_threads';
import * as fs from 'fs';
import { distributeMsisdnToChunk } from '../service/chunkDistributingAlgorithm';
import CsvReadableStream from 'csv-reader';

const filePath = workerData?.filePath;
const resultsArray: any[] = [];

(function startDistribution(){
    const stream = fs.createReadStream(filePath, { encoding: 'utf8' });
    let m = 0;
    stream
    .pipe(new CsvReadableStream({ parseNumbers: true}))
    .on('data', (row: any, ix: any) => {
        const chunkNumber = distributeMsisdnToChunk(row[0]?.toString());
        m++;
        parentPort && parentPort.postMessage([row[0], chunkNumber]);
    });
    
    stream.on('error', err => {
        console.error('Error reading file:', err);
    });
    
    // Listen for end of file
    stream.on('end', () => {
        console.log("Total Processed by worker 1 is ", m);
        parentPort && parentPort.postMessage(false);
    });
})();
 
