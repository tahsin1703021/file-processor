import { parentPort, workerData } from 'worker_threads';

// every 5 sec, call an api which returns json
// store it here 
// if main thread calls u 
// return the data u have 
// if you don't have the data fetch it from the api 


// let flag = 0;
// (function checkMemoryState(){
//     for(let i = 0;i <5;i++){
//         parentPort && parentPort.postMessage(flag);
//         flag++;
//     }
// })()

import axios from "axios";
let json: undefined | any;

async function callApi() {
    let response = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
    json = response.data;
}

function callApiEveryNSeconds(n: number) {
    setInterval(callApi, n * 1000);
}

callApiEveryNSeconds(3);


parentPort?.on('message', (message) => {
    console.log('Worker thread received: ', new Date().toTimeString().split(' ')[0]);
    parentPort && parentPort.postMessage(json);
});
