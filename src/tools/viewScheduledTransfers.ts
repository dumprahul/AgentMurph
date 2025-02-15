import { Address } from 'viem';
import { createViemPublicClient } from '../viem/createViemPublicClient.js';
import { ToolConfig } from './allTools.js';

interface ReadScheduledTransfersArgs {
    user: Address;
}

export const viewTransfersTool: ToolConfig<ReadScheduledTransfersArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'read_scheduled_transfers',
            description: 'Fetch scheduled transfers for a specific user from the TimeLockedTransfers contract',
            parameters: {
                type: 'object',
                properties: {
                    user: {
                        type: 'string',
                        pattern: '^0x[a-fA-F0-9]{40}$',
                        description: 'The wallet address of the user to fetch transfers for',
                    }
                },
                required: ['user']
            }
        }
    },
    handler: async ({ user }) => {
        return await readScheduledTransfers(user);
    }
};

// ✅ Define Contract Address
const CONTRACT_ADDRESS: Address = '0x1E7cFB253301345A8eC4E48ecD538A3405e66c89';

// ✅ Define Contract ABI
const CONTRACT_ABI = [
    {
        "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }],
        "name": "getScheduledTransfers",
        "outputs": [
            { "internalType": "address", "name": "recipient", "type": "address" },
            { "internalType": "uint256", "name": "amount", "type": "uint256" },
            { "internalType": "uint256", "name": "unlockTime", "type": "uint256" },
            { "internalType": "bool", "name": "executed", "type": "bool" }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

export async function readScheduledTransfers(user: Address) {
    const publicClient = createViemPublicClient();

    // ✅ Ensure that only `user` is passed as an argument
    const result = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'getScheduledTransfers',
        args: [user] // 🔥 Only passing `user` as the required argument
    }) as object[];

    return result;
}
