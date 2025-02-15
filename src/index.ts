import 'dotenv/config';
import OpenAI from "openai";

async function main(){

    const client = new OpenAI();
    const assistant = await createAssistant(client);

}
