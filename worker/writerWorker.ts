import { parentPort, workerData } from 'worker_threads';
import * as fs from 'fs';

const filePath = workerData?.filePath;

(function startDistribution() {
    const writeStreamToChunk1 = fs.createWriteStream('csv_files/chunk1.csv');
    const writeStreamToChunk2 = fs.createWriteStream('csv_files/chunk2.csv');
    const writeStreamToChunk3 = fs.createWriteStream('csv_files/chunk3.csv');
    let reader = 3;
    parentPort?.on('message', (data) => {
        if (!data?.result) {
            reader--;
        }
        if (reader < 1) {
            writeStreamToChunk1.end();
            writeStreamToChunk2.end();
            writeStreamToChunk3.end();
            parentPort && parentPort.postMessage(false);
        }
        else if (data.result) {
            if (parseInt(data?.result[1]) === 0) {
                writeStreamToChunk1.write(`${data.result[0]}\n`, (error) => {
                    if (error) {
                        console.error('Error occurred while writing to chunk1.txt:', error);
                    } 
                    // else {
                    //     console.log('Write to chunk1.txt successful.');
                    // }
                });
            }
            if (parseInt(data?.result[1]) === 1) {
                writeStreamToChunk2.write(`${data.result[0]}\n`, (error) => {
                    if (error) {
                        console.error('Error occurred while writing to chunk1.txt:', error);
                    } 
                    // else {
                    //     console.log('Write to chunk1.txt successful.');
                    // }
                });
            }
            if (parseInt(data?.result[1]) === 2) {
                writeStreamToChunk3.write(`${data.result[0]}\n`, (error) => {
                    if (error) {
                        console.error('Error occurred while writing to chunk1.txt:', error);
                    } 
                    // else {
                    //     console.log('Write to chunk1.txt successful.');
                    // }
                });
            }
        }
       
    });
})();

