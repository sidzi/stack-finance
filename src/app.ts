import WebSocket from "ws";
import config from "./config";
import "reflect-metadata";
import express from "express";

async function startServer() {
  const app = express();
  const server = app
    .use((req, res) => res.sendFile("index.html", { root: __dirname }))
    .listen(config.port, () => console.log(`Listening on ${config.port}`));

  const wss = new WebSocket.Server({ server });
  await require("./loaders").default(wss);
}

startServer();
