# node version > 16

# To split a file into predefined 3 chunks in synchronous execution run the following command:

npm run start

# To create a csv file that contains a user input number of msisdns 
# npm run start:genFullBase <no of msisdns>
# example:

npm run start:genFullBase 1200


# To split a file into predefined 3 chunks with worker threads run the following command:

npm run start worker

# To create a file with 2 columns, msisdn and channel_id run the following command

npm run start:genFullBaseWithChannelId <no of msisdns>