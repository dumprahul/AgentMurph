import 'dotenv/config';
import OpenAI from "openai";
import { createAssistant } from './openai/createAssistant.js';
import { createThread } from './openai/createThread.js';
import { createRun } from './openai/createRun.js';
import { performRun } from './openai/performRun.js';

async function main(){

    const client = new OpenAI();
    const message = "Hello I'm Agent Murph! Can you get the wallet balance of my wallet 0x4a2Fbd8509e6CE3794F2457Fd1ca05ff5B0808c9?"
    const assistant = await createAssistant(client);
    const thread = await createThread(client,message);

    const run = await createRun(client, thread, assistant.id);
    const result = await performRun(run, client, thread);

    console.log(result);
};

main();

