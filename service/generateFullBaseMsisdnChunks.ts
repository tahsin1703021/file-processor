import * as fs from 'fs';
const { exec } = require('child_process');

export const generateFullBaseMsisdnChunks = async (inputFile: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const splitCommand = `split -l $((($(wc -l < ${inputFile}) + 2) / 3)) --numeric-suffixes=1 ${inputFile} csv_files/fullBase_part_ --additional-suffix=.csv`;

        exec(splitCommand, (error: { message: any; }, stdout: any, stderr: any) => {
            if (error) {
                console.error(`Error splitting file: ${error.message}`);
                reject(error); // ❌ Properly handle errors
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                reject(error); // ❌ Properly handle errors
                return;
            }
            resolve(); // ✅ Waits until the exec command completes
        });
    });
};