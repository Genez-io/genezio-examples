
import * as fs from "fs";

import { OpenAIEmbeddings } from "@langchain/openai";
import * as lancedb from "vectordb";
import { LanceDB } from "@langchain/community/vectorstores/lancedb";
import { TextLoader} from "langchain/document_loaders/fs/text";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";

import dotenv from "dotenv";
dotenv.config();

export async function createVector() {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      throw new Error(
        "You need to provide an OpenAI API key. Go to https://platform.openai.com/account/api-keys to get one.",
      );
    }

    const database = "./lancedb";
    if (!fs.existsSync(database)) {
      try {
        fs.mkdirSync(database);
      } catch (e) {
        console.error(`Error creating directory '${database}':`, e);
      }
    }

    const db = await lancedb.connect(database);

    const embeddings = new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY });

    const table = await db.createTable(
      "vectors",
      [{ vector: Array(1536), text: "sample", source: 'string' }],
      { writeMode: lancedb.WriteMode.Overwrite }
    );

    const loader = new DirectoryLoader(
      "./data",
      {
        ".md": (path) => new TextLoader(path),
        ".txt": (path) => new TextLoader(path),
      }
    );
    const documents = await loader.load();

    const vectorStore = await LanceDB.fromDocuments(
      documents,
      embeddings,
      {table},
    );

    return vectorStore;
}

(async () => {
  console.log("Creating LanceDB vector table..");
  await createVector();
  console.log("Successfully created LanceDB vector table.");
})();
