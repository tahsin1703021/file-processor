const { exec } = require('child_process');

export const truncatePreExistingChunkFiles = async (filePath: string) => {
    const commandToTruncateFiles = `truncate -s 0 ${filePath}`;

    exec(commandToTruncateFiles, (error: { message: any; }, stdout: any, stderr: any) => {
        if (error) {
            console.error(`Error generating fullbase: ${error.message}`);
            // process.exit();
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            //process.exit();
            return;
        }

        console.log('File contents cleared successfully.');
    });
};