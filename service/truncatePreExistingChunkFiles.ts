const { exec } = require('child_process');

export const truncatePreExistingChunkFiles = (filePath: string) => {
    const commandToTruncateFiles = `truncate -s 0 ${filePath}`;

    exec(commandToTruncateFiles, (error: { message: any; }, stdout: any, stderr: any) => {
        if (error) {
            console.error(`Error generating fullbase: ${error.message}`);
            process.exit();
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            process.exit();
        }

        console.log('File contents cleared successfully.');
    });
};