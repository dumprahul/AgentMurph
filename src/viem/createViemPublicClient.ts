import { createPublicClient, http } from 'viem'
import { mantleSepoliaTestnet } from 'viem/chains'

export function createViemPublicClient() {
    return createPublicClient({
        chain: mantleSepoliaTestnet,
        transport: http(),
    });
}