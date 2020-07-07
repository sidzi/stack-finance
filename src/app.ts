import WebSocket from "ws";
import config from "./config";
import "reflect-metadata";

async function startServer() {
  const wss = new WebSocket.Server(
    {
      host: "0.0.0.0",
      port: config.port,
    },
    () => {
      console.log(`Listening on ${config.port}`);
    }
  );
  await require("./loaders").default(wss);
}

startServer();
