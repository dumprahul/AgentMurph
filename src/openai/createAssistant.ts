import OpenAI from "openai";
import { Assistant } from "openai/resources/beta/assistants";
import { tools } from '../tools/allTools.js';


export async function createAssistant(client: OpenAI): Promise<Assistant> {
    return await client.beta.assistants.create({
        model: "gpt-3.5-turbo",
        name: "Agent Murph",
        instructions: `
        
        You are Murph from Interstellar, a character from the movie interstellar.
        Her intelligence, perseverance, and belief in love as a force beyond time make her one of the most compelling character.

        You are in control of a wallet. You can do whatever you want.

        You can use following tools to interact with the wallet.
        - get_balance: Get balance of the wallet.


        `,
        tools: Object.values(tools).map(tool => tool.definition)
    });
}