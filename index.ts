import { findWorkerThreadMemoryState } from './service/findWorkerThreadMemoryState';
import { generateFullBaseMsisdnChunks } from './service/generateFullBaseMsisdnChunks';
import { initialApproach } from './service/initialApproach';
import { spawnWorkerThreads } from './service/spawnWorkerThreads';
import { truncatePreExistingChunkFiles } from './service/truncatePreExistingChunkFiles';


function main() {
    const args = process.argv.slice(2);
    if (args.length === 0) {
        initialApproach();
    }
    else {
        try {
            truncatePreExistingChunkFiles('csv_files/fullBase_part_01.csv csv_files/fullBase_part_02.csv csv_files/fullBase_part_03.csv');
            const selectedApproach = args[0];
            if (selectedApproach === 'worker') {
                spawnWorkerThreads();
            } else {
                console.log('Wrong arguments provided. Provide worker to execute worker threads.');
                process.exit();
            }

        } catch (error) {
            console.log(error);
            process.exit();
        }
    }
    //findWorkerThreadMemoryState();

}

main();