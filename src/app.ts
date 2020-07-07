import WebSocket from "ws";
import config from "./config";
import "reflect-metadata";
import requestHandler from "./services/requestHandler";

async function startServer() {
  await require("./loaders").default();

  const wss = new WebSocket.Server(
    {
      host: "0.0.0.0",
      port: config.port,
    },
    () => {
      console.log(`Listening on ${config.port}`);
    }
  );

  wss.on("connection", requestHandler);
}

startServer();
