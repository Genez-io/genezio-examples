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
    // Set the OpenAI API key
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      throw new Error(
        "You need to provide an OpenAI API key. Go to https://platform.openai.com/account/api-keys and save it in a `.env` file.",
      );
    }

    // Define the OpenAI model
    const model = new OpenAI({
			modelName: "gpt-4",
			openAIApiKey: OPENAI_API_KEY,
      temperature: 0.5,
			verbose: true
		});

    // Define the prompt that will be fed to the model
    const prompt = ChatPromptTemplate.fromMessages([
      [
        "ai",
        `Answer the question based on only the following context. If the information is not in the context, use your previous knowledge to answer the question.

{context}`,
      ],
      ["human", "{question}"],
    ]);

    // Set the database path
    const database = "./lancedb";
    // Connect to the database
    const db = await connect(database);
    // Open the table
    const table = await db.openTable("vectors");

    // Initialize the vector store object with the OpenAI embeddings and the table
    const vectorStore = new LanceDB(new OpenAIEmbeddings(), { table });
    // Retrieve the most similar context to the input question
    const retriever = vectorStore.asRetriever(1);
    // Create an output parser that will convert the model's response to a string
    const outputParser = new StringOutputParser();

    // Create a pipeline that will feed the input question and the database retrieved context to the model
    const setupAndRetrieval = RunnableMap.from({
      context: new RunnableLambda({
        func: (input: string) => retriever.invoke(input).then((response) => response[0].pageContent),
      }).withConfig({ runName: "contextRetriever" }),
      question: new RunnablePassthrough(),
    });

    // Feed the input question and the database retrieved context to the model
    const chain = setupAndRetrieval.pipe(prompt).pipe(model).pipe(outputParser);
    // Invoke the model to answer the question
    const response = await chain.invoke(question);
    console.log("Answer:", response);

    return response;
  }
}
