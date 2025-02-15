import { Address } from 'viem';
import { createViemPublicClient } from '../viem/createViemPublicClient.js';
import { ToolConfig } from './allTools.js';

interface ReadScheduledTransfersArgs {
    contract: Address;
    user: Address;
    abi: any[];
}

export const readScheduledTransfersTool: ToolConfig<ReadScheduledTransfersArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'read_scheduled_transfers',
            description: 'Fetch scheduled transfers for a specific user from the TimeLockedTransfers contract',
            parameters: {
                type: 'object',
                properties: {
                    contract: {
                        type: 'string',
                        pattern: '^0x[a-fA-F0-9]{40}$',
                        description: 'The contract address of TimeLockedTransfers',
                    },
                    user: {
                        type: 'string',
                        pattern: '^0x[a-fA-F0-9]{40}$',
                        description: 'The wallet address of the user to fetch transfers for',
                    },
                    abi: {
                        type: 'array',
                        description: 'The ABI of the TimeLockedTransfers contract',
                        items: {
                            type: 'object'
                        }
                    }
                },
                required: ['contract', 'user', 'abi']
            }
        }
    },
    handler: async ({ contract, user, abi }) => {
        return await readScheduledTransfers(contract, user, abi);
    }
};

export async function readScheduledTransfers(
    contract: Address,
    user: Address,
    abi: any[]
) {
    const publicClient = createViemPublicClient();
    const result = await publicClient.readContract({
        address: contract,
        abi,
        functionName: 'getScheduledTransfers',
        args: [user]
    }) as object[];

    return result;
}
