export const fundContract = {
    "inputs": [],
    "name": "fundContract",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
};

export const scheduleTransfer = {
    "inputs": [
        { "internalType": "address", "name": "_recipient", "type": "address" },
        { "internalType": "uint256", "name": "_amount", "type": "uint256" },
        { "internalType": "uint256", "name": "_unlockTime", "type": "uint256" }
    ],
    "name": "scheduleTransfer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}
;

export const checkUpkeep = {
    "inputs": [{ "internalType": "bytes", "name": "", "type": "bytes" }],
    "name": "checkUpkeep",
    "outputs": [
        { "internalType": "bool", "name": "upkeepNeeded", "type": "bool" },
        { "internalType": "bytes", "name": "performData", "type": "bytes" }
    ],
    "stateMutability": "view",
    "type": "function"
};

export const performUpKeep = {
    "inputs": [{ "internalType": "bytes", "name": "performData", "type": "bytes" }],
    "name": "performUpkeep",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
};
