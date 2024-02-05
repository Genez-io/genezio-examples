import { io } from "socket.io-client";

export const userSocket = io(
  "https://92f4cf70-09d1-474b-9ac4-a38deb80ce00.dev.cluster.genez.io",
  { transports: ["websocket"] }
);
export const taskSocket = io(
  "https://e09cdb69-3895-466e-a85a-689c4bf7def7.dev.cluster.genez.io",
  { transports: ["websocket"] }
);
