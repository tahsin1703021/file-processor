import { getWorkerInstance } from "./spawnWorkerThreads";
import * as fs from 'fs';

function IO_Call() {
    fs.readFile(`${process.cwd()}/service/test.txt`, 'utf8', (err: any, data: any) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        console.log('Finished reading File; ', new Date().toTimeString().split(' ')[0]);
    });

}

export function findWorkerThreadMemoryState() {
    let r: any; 
    console.log("Execution of the main thread starts at: ",new Date().toTimeString().split(' ')[0]);
    const worker = getWorkerInstance('./worker/checkMemoryStateWorker.import.js', null, './checkMemoryStateWorker.ts');
    
    //do an I/O call
    IO_Call();
    //listen to worker result
    setTimeout(()=> {
        console.log("Calling the worker thread for updaetd value: ", new Date().toTimeString().split(' ')[0]);
        worker.postMessage('Give me value');
    }, 2000);

    setTimeout(()=> {
        console.log("Calling the worker thread for updaetd value: ", new Date().toTimeString().split(' ')[0]);
        worker.postMessage('Give me value');
    }, 5000);

    setTimeout(()=> {
        console.log("Calling the worker thread for updaetd value: ", new Date().toTimeString().split(' ')[0]);
         if (!r) {
            worker.postMessage('Give me value');
         } else {
            console.log(' I have the value stored in my memory');
            console.log('The value from the main thread is: ', r)
         }
    }, 6000);

    worker.on('message', (result) => {
        console.log("Received Time: ", new Date().toTimeString().split(' ')[0]);
        console.log("Result is ", result);
        r = result;
    });

}


//call the worker thread to fetch data
// do a computation task or IO          
//if i get back data from the worker thread, check the time and log the result

/// give mee data 
// i am doing other stuff 
// data && stuff -> 

