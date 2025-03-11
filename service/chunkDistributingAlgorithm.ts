export const distributeMsisdnToChunk = (msisdn: string) => {
    let sum = 0;
    for (var i = 0; i < msisdn.length; i++) {
        sum += parseInt(msisdn[i]);
    }
    
    const chunkIndex = sum % 3;
    
    return chunkIndex;
}