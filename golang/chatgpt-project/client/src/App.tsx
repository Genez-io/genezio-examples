import { For, createSignal } from "solid-js";

import { GptCaller } from "@genezio-sdk/chatgpt-project";

import "./App.css";

type Message = {
  text: string;
  isUser: boolean;
};

function App() {
  const [messages, setMessages] = createSignal<Message[]>([]);
  const [requestText, setRequestText] = createSignal("");
  const [isRequesting, setIsRequesting] = createSignal(false);

  const [alertError, setAlertError] = createSignal("");

  function sendRequest(e: Event) {
    e.preventDefault();
    setIsRequesting(true);
    GptCaller.askChatGpt(requestText())
      .then((response) => {
        console.log(response);
        setMessages([
          ...messages(),
          { text: requestText(), isUser: true },
          { text: response, isUser: false },
        ]);
        setRequestText("");
        setIsRequesting(false);
      })
      .catch((error) => {
        console.error(error);
        setAlertError("An error occurred: " + error);
        setIsRequesting(false);
      });
  }

  return (
    <div class="App">
      <section class="msger">
        <header class="msger-header">
          <h4>Rephrasing app using ChatGPT, Genezio and React</h4>
        </header>

        {alertError() != "" ? (
          <main class="msger-chat">
            <div class="alert">{alertError()}</div>
          </main>
        ) : (
          <main class="msger-chat">
            <For each={messages()}>
              {(message) => {
                if (message.isUser) {
                  return (
                    <div class="msg right-msg">
                      <div class="msg-bubble">
                        <div class="msg-info">
                          <div class="msg-info-name">You</div>
                        </div>

                        <div class="msg-text">{message.text}</div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div class="msg left-msg">
                      <div class="msg-bubble">
                        <div class="msg-info">
                          <div class="msg-info-name">ChatGPT</div>
                        </div>

                        <div class="msg-text">{message.text}</div>
                      </div>
                    </div>
                  );
                }
              }}
            </For>
          </main>
        )}

        <form class="msger-inputarea" onSubmit={(e) => sendRequest(e)}>
          <input
            type="text"
            class="msger-input"
            placeholder="Enter your message..."
            value={requestText()}
            onChange={(e) => setRequestText(e.target.value)}
          />
          <button
            type="submit"
            class="msger-send-btn"
            onClick={(e) => sendRequest(e)}
          >
            {isRequesting() ? "Sending..." : "Send"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default App;
