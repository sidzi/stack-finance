import Container from "typedi";
import mongoose from "./mongoose";
import { StockTicker } from "../services/StockTicker";
import EventEmitter from "events";
import WebSocket from "ws";
import requestHandler from "./requestHandler";

export default async (wss: WebSocket.Server) => {
  wss.on("connection", requestHandler);

  await mongoose();
  console.log(`DB Connected`);

  const model = require("../models/StocksSchema").default;
  Container.set("StocksModel", model);

  const eventEmitter = new EventEmitter.EventEmitter();
  Container.set("EventEmitter", eventEmitter);

  const stockTicker = Container.get(StockTicker);
  // noinspection ES6MissingAwait
  stockTicker.startTicking();
  console.log(`Ticker Started`);
};
