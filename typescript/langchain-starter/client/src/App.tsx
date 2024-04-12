import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { BackendService } from "@genezio-sdk/langchain-starter";
import "./App.css";

const Spinner = () => (
  <div className="spinner-container">
    <div className="spinner"></div>
  </div>
);

export default function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  async function askOpenAI() {
    setIsLoading(true);
    setTimeout(async () => {
      setResponse(await BackendService.ask(question));
      setIsLoading(false);
    }, 10000);
  }

  return (
    <>
      <div>
        <a href="https://genezio.com" target="_blank">
          <img
            src="https://raw.githubusercontent.com/Genez-io/graphics/main/svg/Logo_Genezio_White.svg"
            className="logo genezio light"
            alt="Genezio Logo"
          />
          <img
            src="https://raw.githubusercontent.com/Genez-io/graphics/main/svg/Logo_Genezio_Black.svg"
            className="logo genezio dark"
            alt="Genezio Logo"
          />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Genezio + OpenAI = ❤️</h1>
      <div className="card">
        <input
          type="text"
          className="input-box"
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What's your question?"
        />
        <br />
        <br />

      <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <button onClick={askOpenAI}>Get your answer</button>
      )}
      <p className="read-the-docs">{response}</p>
      </div>

      </div>
    </>
  );
}
