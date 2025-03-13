import { truncatePreExistingChunkFiles } from "./truncatePreExistingChunkFiles";

const { exec } = require('child_process');


(function createFullBase() {
    const args = process.argv.slice(2);
    if(args.length !==1 ){
        console.log('Provide number of msisdns for fullbase');
        // process.exit();
        return;
    }
    let noOfMsisdns = parseInt(args[0]);
    
    //truncatePreExistingChunkFiles('csv_files/fullbase.csv');

    const commandToGenerateMsisdns = `seq ${noOfMsisdns} | awk '{ printf "88017%08d\\n", int(rand() * 100000000) }' > csv_files/fullbase.csv`;

    exec(commandToGenerateMsisdns, (error: { message: any; }, stdout: any, stderr: any) => {
        if (error) {
            console.error(`Error generating fullbase: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }

        console.log('Fullbase created successfully.');
    });
})()