import { Address } from 'viem';
import { createViemPublicClient } from '../viem/createViemPublicClient.js';
import { ToolConfig } from './allTools.js';

interface GetScheduledTransfersArgs {
    user: Address;
}

export const getScheduledTransfersTool: ToolConfig<GetScheduledTransfersArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'get_scheduled_transfers',
            description: 'Fetch scheduled transfers for a user from the smart contract',
            parameters: {
                type: 'object',
                properties: {
                    user: {
                        type: 'string',
                        pattern: '^0x[a-fA-F0-9]{40}$',
                        description: 'The address of the user',
                    }
                },
                required: ['user']
            }
        }
    },
    handler: async ({ user }) => {
        return await getScheduledTransfers(user);
    }
};

export async function getScheduledTransfers(user: Address) {
    const contractAddress: Address = "0x1E7cFB253301345A8eC4E48ecD538A3405e66c89"; // Fill this in later
    const abi: any[] = [
        {
          "constant": true,
          "inputs": [
            {
              "name": "_user",
              "type": "address"
            }
          ],
          "name": "getScheduledTransfers",
          "outputs": [
            {
              "components": [
                {
                  "name": "recipient",
                  "type": "address"
                },
                {
                  "name": "amount",
                  "type": "uint256"
                },
                {
                  "name": "unlockTime",
                  "type": "uint256"
                },
                {
                  "name": "executed",
                  "type": "bool"
                }
              ],
              "name": "",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
; 
    
    const publicClient = createViemPublicClient();
    const result = await publicClient.readContract({
        address: contractAddress,
        abi,
        functionName: 'getScheduledTransfers',
        args: [user]
    }) as object[];

    return result;
}
