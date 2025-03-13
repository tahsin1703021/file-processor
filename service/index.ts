import { findWorkerThreadMemoryState } from './findWorkerThreadMemoryState';
import { generateFullBaseMsisdnChunks } from './generateFullBaseMsisdnChunks';
import { initialApproach } from './initialApproach';
import { spawnWorkerThreads } from './spawnWorkerThreads';
import { truncatePreExistingChunkFiles } from './truncatePreExistingChunkFiles';


export const startSplitting = async (type: string | null) => {
    if (!type) {
        return await initialApproach();
    }
    else {
        try {
            await truncatePreExistingChunkFiles('csv_files/fullBase_part_01.csv csv_files/fullBase_part_02.csv csv_files/fullBase_part_03.csv');
            if (type === 'worker') {
                return await spawnWorkerThreads();
            } else {
                return 'Wrong arguments provided. Provide worker to execute worker threads. Correct argumetn should be "worker"';
            }

        } catch (error) {
            console.log(error);
            return error;
            // process.exit();
        }
    }
    //findWorkerThreadMemoryState();

}