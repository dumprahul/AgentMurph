import { getBalanceTool } from './getBalance.js';
import { getWalletAddressTool } from './getWalletAddress.js';
import { sendTransactionTool } from './sendTransaction.js';
import { getTransactionReceiptTool } from './getTransactionReceipt.js';
import { deployErc20Tool } from './deployErc20.js';
import { scheduleTransferTool } from './scheduleTransfer.js';
import { viewTransfersTool } from './viewScheduledTransfers.js';


export interface ToolConfig<T = any> {
    definition: {
        type: 'function';
        function: {
            name: string;
            description: string;
            parameters: {
                type: 'object';
                properties: Record<string, unknown>;
                required: string[];
            };
        };
    };
    handler: (args: T) => Promise<any>;
}

export const tools: Record<string, ToolConfig> = {
    get_balance: getBalanceTool,
    get_wallet_address: getWalletAddressTool,
    send_transaction: sendTransactionTool,
    get_transaction_receipt: getTransactionReceiptTool,
    deploy_erc20: deployErc20Tool,
    schedule_transfer:scheduleTransferTool,
    view_scheduled_transfers:viewTransfersTool
};
