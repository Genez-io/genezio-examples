import OpenAI from 'openai';
import { GenezioDeploy } from "@genezio/types"

@GenezioDeploy()
export class GptCaller {
  openai = null;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_SECRET_KEY
    });
  }

  async askChatGPT(requestText) {
    const completion = await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": "rephrase this:" + requestText}],
    });

    console.log(
      `DEBUG: request: ${requestText}, response: ${completion.choices[0].message}`
    );
    return completion.choices[0].message.content;
  }
}
