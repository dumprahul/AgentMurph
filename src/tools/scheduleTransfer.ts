import { Address, Hash } from 'viem';
import { createViemWalletClient } from '../viem/createViemWalletClient.js';
import { ToolConfig } from './allTools.js';

const CONTRACT_ADDRESS: Address = '0x1E7cFB253301345A8eC4E48ecD538A3405e66c89' as Address; // 🔹 Fill in your contract address here
const CONTRACT_ABI: any[] = [
    {
        "inputs": [],
        "name": "fundContract",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "_recipient", "type": "address" },
            { "internalType": "uint256", "name": "_amount", "type": "uint256" },
            { "internalType": "uint256", "name": "_unlockTime", "type": "uint256" }
        ],
        "name": "scheduleTransfer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "bytes", "name": "", "type": "bytes" }],
        "name": "checkUpkeep",
        "outputs": [
            { "internalType": "bool", "name": "upkeepNeeded", "type": "bool" },
            { "internalType": "bytes", "name": "performData", "type": "bytes" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "bytes", "name": "performData", "type": "bytes" }],
        "name": "performUpkeep",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getContractBalance",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }],
        "name": "getScheduledTransfers",
        "outputs": [
            {
                "internalType": "struct TimeLockedTransfers.Transfer[]",
                "name": "",
                "type": "tuple[]",
                "components": [
                    { "internalType": "address", "name": "recipient", "type": "address" },
                    { "internalType": "uint256", "name": "amount", "type": "uint256" },
                    { "internalType": "uint256", "name": "unlockTime", "type": "uint256" },
                    { "internalType": "bool", "name": "executed", "type": "bool" }
                ]
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

interface ScheduleTransferArgs {
    recipient: Address;
    amount: string;
    unlockTime: string;
}

export const scheduleTransferTool: ToolConfig<ScheduleTransferArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'schedule_transfer',
            description: 'Schedules a future ETH transfer using a smart contract',
            parameters: {
                type: 'object',
                properties: {
                    recipient: {
                        type: 'string',
                        pattern: '^0x[a-fA-F0-9]{40}$',
                        description: 'The recipient address for the scheduled transfer',
                    },
                    amount: {
                        type: 'string',
                        description: 'Amount of ETH to be transferred (in wei)',
                    },
                    unlockTime: {
                        type: 'string',
                        description: 'Unix timestamp when the transfer should execute',
                    }
                },
                required: ['recipient', 'amount', 'unlockTime']
            }
        }
    },
    handler: async ({ recipient, amount, unlockTime }) => {
        return await scheduleTransfer({ recipient, amount, unlockTime });
    }
};

export async function scheduleTransfer({
    recipient,
    amount,
    unlockTime
}: ScheduleTransferArgs): Promise<Hash> {
    const walletClient = createViemWalletClient();
    console.log("On-chain schedule started.")
    const hash = await walletClient.writeContract({
        address: CONTRACT_ADDRESS, // 🔹 Uses the predefined contract address
        abi: CONTRACT_ABI, // 🔹 Uses the predefined contract ABI
        functionName: 'scheduleTransfer',
        args: [recipient, BigInt(amount), BigInt(unlockTime)], // Ensures correct data types
    });
    console.log("On-chain tx finished.")
    return hash;
}
