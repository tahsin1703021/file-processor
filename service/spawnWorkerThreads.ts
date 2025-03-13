import { Worker } from 'worker_threads';
import { generateFullBaseMsisdnChunks } from './generateFullBaseMsisdnChunks';

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

const handleWorkerMessage = (workerName: string, result: any, writeWorker: Worker) => {
  if (result === false || result === 'false') {
    console.log(`End of worker ${workerName}`);
  }
  writeWorker.postMessage({ result });
};

const startFullBaseSplitting = async() => {
  try {
    console.log('Starting full base splitting');
    await generateFullBaseMsisdnChunks('csv_files/fullbase.csv');
    console.log('Full base splitting successful');
    return true;
  } catch (error) {
    console.log('Error while full base splitting');
    console.log(error);
    return false;
  }
};

export const spawnWorkerThreads = async (): Promise<number> => {
  console.log('Worker Approach');
  const startTime = performance.now();

  const fullBaseSplitSuccessful = await startFullBaseSplitting();
  if (!fullBaseSplitSuccessful) {
    console.error('Full base splitting failed. Exiting worker approach');
    return -1; // Return -1 to indicate failure
  }

  return new Promise((resolve, reject) => {
    try {
      const worker1 = getWorkerInstance('./worker/worker1.import.js', 'csv_files/fullBase_part_01.csv', './worker1.ts');
      const worker2 = getWorkerInstance('./worker/worker2.import.js', 'csv_files/fullBase_part_02.csv', './worker2.ts');
      const worker3 = getWorkerInstance('./worker/worker3.import.js', 'csv_files/fullBase_part_03.csv', './worker3.ts');
      const writeWorker = getWorkerInstance('./worker/writerWorker.import.js', {
        chunk1Path: '../csv_files/chunk1.csv',
        chunk2Path: '../csv_files/chunk2.csv',
        chunk3Path: '../csv_files/chunk3.csv'
      }, './writerWorker.ts');

      worker1.on('message', (result) => handleWorkerMessage('1', result, writeWorker));
      worker2.on('message', (result) => handleWorkerMessage('2', result, writeWorker));
      worker3.on('message', (result) => handleWorkerMessage('3', result, writeWorker));

      writeWorker.on('message', (result) => {
        console.log('End of writer thread');

        if (result === false || result === 'false') {
          const endTime = performance.now();
          const processTime = endTime - startTime;
          console.log("Time took by worker approach to split the files:", processTime);
          resolve(processTime); // ✅ Return process time to the caller
        }
      });

      // Handle worker errors
      [worker1, worker2, worker3, writeWorker].forEach(worker => {
        worker.on('error', (error) => reject(error));
      });

    } catch (error) {
      reject(error);
    }
  });
};

