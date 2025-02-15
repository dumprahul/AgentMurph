import { Address, parseEther, AccessList } from 'viem'
import { createViemWalletClient } from '../viem/createViemWalletClient.js';
import { ToolConfig } from './allTools.js';

interface SendTransactionArgs {
    to: Address;
    value?: string;
    data?: `0x${string}`;
}

export const sendTransactionTool: ToolConfig<SendTransactionArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'send_transaction',
            description: 'Send a transaction with optional parameters',
            parameters: {
                type: 'object',
                properties: {
                    to: {
                        type: 'string',
                        pattern: '^0x[a-fA-F0-9]{40}$',
                        description: 'The recipient address',
                    },
                    value: {
                        type: 'string',
                        description: 'The amount of MNT to send (in MNT, not Wei)',
                        optional: true,
                    },
                    data: {
                        type: 'string',
                        pattern: '^0x[a-fA-F0-9]*$',
                        description: 'Contract interaction data',
                        optional: true,
                    },
                },
                required: ['to']
            }
        }
    },
    handler: async (args) => {
        const result = await sendTransaction(args);
        if (!result.success || !result.hash) throw new Error(result.message);
        return result.hash;
    }
};

async function sendTransaction({
    to,
    value,
    data,
}: SendTransactionArgs) {
    try {
        const walletClient = createViemWalletClient();

        const hash = await walletClient.sendTransaction({
            to,
            value: value ? parseEther(value) : undefined,
            data,
        })

        return {
            success: true,
            hash,
            message: `Transaction sent successfully. Hash: ${hash}`
        }
    } catch (error) {
        return {
            success: false,
            hash: null,
            message: `Failed to send transaction: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
    }
}