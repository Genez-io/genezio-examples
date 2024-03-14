import { GenezioDeploy } from "@genezio/types";
import { Server } from "socket.io";
/**
 * This class represents a hello world server that can be deployed on genezio infrastructure
 * using "genezio deploy" command or tested locally using "genezio local".
 */
@GenezioDeploy()
export class HelloWorld {
  socketListener = undefined
  constructor(socketListener) {
    this.socketListener = socketListener
    // This line below is important, without it socket.io is not added to the dependencies
    // will be fixed soon
    Server;
    this.socketListener.on("connection", (socket) => {
      console.log("A user connected");

      socket.on("ping", () => {
        console.log("Ping received!")
        socket.emit("pong")
      })

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
    console.log("Constructor called!")
  }

  /**
   * Method that returns a "Hello world" message.
   */
  helloWorld() {
    console.log("Hello world request received!")

    return "Hello world! ";
  }

  /**
   * Method that returns a personalized "Hello world" message.
   */
  hello(name, from) {
    console.log(`Hello world request received with name ${name} from ${from}!`)
    return `Hello, ${name}, from ${from}!`
  }
}
