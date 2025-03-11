const fs = require('fs');

(function createFullBase() {
    const args = process.argv.slice(2);
    if (args.length !== 1) {
        console.log('Provide number of msisdns for fullbase');
        process.exit();
    }
    
    let noOfMsisdns = parseInt(args[0]);
    
    // Prepare CSV file header
    const header = 'msisdn,channel_id\n';
    fs.writeFileSync('csv_files/fullbase.csv', header);

    // Generate msisdns and channel_ids
    let data = '';
    for (let i = 0; i < noOfMsisdns; i++) {
        let msisdn = `88017${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`;
        
        // Assign channel_id, making most of the channel_ids 3
        let channel_id = Math.random() < 0.8 ? 3 : Math.floor(Math.random() * 5) + 1; // 80% chance of being 3, others randomly 1-5

        // Append msisdn and channel_id to data
        data += `${msisdn},${channel_id}\n`;
    }

    // Write the full data to the file at once
    fs.appendFileSync('csv_files/mygp_fullbase.csv', data);

    console.log('Fullbase with msisdn and channel_id created successfully.');
})();
