import OpenAI from "openai";
import { GenezioDeploy } from "@genezio/types";

const red_color = "\x1b[31m%s\x1b[0m";
const missing_env_error =
  "ERROR: Your OPENAI_SECRET_KEY environment variable is not properly set, go to https://genez.io/blog/create-your-first-app-using-chatgpt/ to learn how to obtain an OpenAI key";

@GenezioDeploy()
export class GptCaller {
  openai = null;

  constructor() {
    if (!process.env.OPENAI_SECRET_KEY) {
      console.log(red_color, missing_env_error);
      return;
    }
    try {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_SECRET_KEY,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async askChatGPT(requestText) {
    if (!process.env.OPENAI_SECRET_KEY) {
      console.log(red_color, missing_env_error);
      return { success: false, err: missing_env_error };
    }
    if (this.openai != null) {
      try {
        const completion = await this.openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: "rephrase this:" + requestText }],
        });
      } catch (error) {
        console.log(error);
        return { success: false };
      }
    } else {
      console.log(
        red_color,
        "Your OpenAI controller isn't initialized, check your backend logs at https://app.genez.io  and check if your environemnt variables are properly set"
      );
      return {
        success: false,
        err: "Your OpenAI controller isn't initialized, check your backend logs at https://app.genez.io  and check if your environemnt variables are properly set",
      };
    }

    console.log(
      `DEBUG: request: ${requestText}, response: ${completion.choices[0].message}`
    );
    return { success: true, content: completion.choices[0].message.content };
  }
}
