import { Worker } from 'worker_threads';
import { generateFullBaseMsisdnChunks } from './generateFullBaseMsisdnChunks';
let m = 0;

export const getWorkerInstance = (
  jsPath: string,
  filePath: any = '',
  tsFilePath: string,
) => (new Worker(jsPath, {
  workerData: {
    filePath,
    path: tsFilePath,
  }
}));

const handleWorkerMesssage = (workerName: string, result: any, writeWorker: Worker) => {
  if (result === false || result === 'false') {
    console.log(`End of worker ${workerName}`);
  }
  writeWorker.postMessage({ result });
};

const startFullBaseSplitting = () => {
  try {
    console.log('Starting full base splitting');
    generateFullBaseMsisdnChunks('csv_files/fullbase.csv');
    console.log('Full base splitting successful');
  } catch (error) {
    console.log('Error while full base splitting');
    console.log(error)
  }
};

export const spawnWorkerThreads = () => {
  console.log('Worker Approach')
  const startTime = performance.now();
  startFullBaseSplitting();  

  const worker1 = getWorkerInstance('./worker/worker1.import.js', 'csv_files/fullBase_part_01.csv', './worker1.ts');
  const worker2 = getWorkerInstance('./worker/worker2.import.js', 'csv_files/fullBase_part_02.csv', './worker2.ts');
  const worker3 = getWorkerInstance('./worker/worker3.import.js', 'csv_files/fullBase_part_03.csv', './worker3.ts');
  const writeWorker = getWorkerInstance('./worker/writerWorker.import.js', {
    chunk1Path: '../csv_files/chunk1.csv',
    chunk2Path: '../csv_files/chunk2.csv',
    chunk3Path: '../csv_files/chunk3.csv'
  }, './writerWorker.ts');


  worker1.on('message', (result) => handleWorkerMesssage('1', result, writeWorker));
  worker2.on('message', (result) => handleWorkerMesssage('2', result, writeWorker));
  worker3.on('message', (result) => handleWorkerMesssage('3', result, writeWorker));

  writeWorker.on('message', (result) => {
    console.log('End of writer thread');

    if (result === false || result === 'false') {
      const endTime = performance.now();
      console.log("Time took by worker approach to split the files", endTime - startTime)
      //process.exit();
    }
  });
}
