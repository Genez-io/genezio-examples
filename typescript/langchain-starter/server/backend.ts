import { GenezioDeploy } from "@genezio/types";
import { LanceDB } from "@langchain/community/vectorstores/lancedb";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { OpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { connect } from "vectordb";
import {
  RunnableLambda,
  RunnableMap,
  RunnablePassthrough,
} from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

@GenezioDeploy()
export class BackendService {
  constructor() {}

  async ask(question: string): Promise<string> {
    console.log("Attempting to answer:", question)

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
			throw new Error("You need to provide an OpenAI API key. Go to https://platform.openai.com/account/api-keys to get one.");
		}

    const database = "./lancedb";

    const model = new OpenAI({
			modelName: "gpt-4",
			openAIApiKey: OPENAI_API_KEY,
      temperature: 0.5,
			verbose: true
		});

    const db = await connect(database);
    const table = await db.openTable('vectors')

    console.log("Opened table")
    const vectorStore = new LanceDB(new OpenAIEmbeddings, { table })
    const retriever = vectorStore.asRetriever(1);

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "ai",
        `Answer the question based on only the following context. If the information is not in the context, use your previous knowledge to answer the question.

{context}`,
      ],
      ["human", "{question}"],
    ]);

    const outputParser = new StringOutputParser();

    const setupAndRetrieval = RunnableMap.from({
      context: new RunnableLambda({
        func: (input: string) =>
          retriever.invoke(input).then((response) => response[0].pageContent),
      }).withConfig({ runName: "contextRetriever" }),
      question: new RunnablePassthrough(),
    });

    const chain = setupAndRetrieval.pipe(prompt).pipe(model).pipe(outputParser)
    const response = await chain.invoke(question);
    console.log("Answer:", response)

    return response;
  }
}
