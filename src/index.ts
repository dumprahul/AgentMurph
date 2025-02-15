import 'dotenv/config';
import OpenAI from "openai";
import { createAssistant } from './openai/createAssistant.js';
import { createThread } from './openai/createThread.js';
import { createRun } from './openai/createRun.js';
import { performRun } from './openai/performRun.js';

async function main(){

    const client = new OpenAI();
    const message = "Hello Agent Murph! Get the receipt of a transaction to check its status and details - 0x20052bf91a5bce65d0ae42a7393a365d76090dfb39084a3fac17cf9d3ab64d8d"
    const assistant = await createAssistant(client);
    const thread = await createThread(client,message);

    const run = await createRun(client, thread, assistant.id);
    const result = await performRun(run, client, thread);

    console.log(result);
};

main();

