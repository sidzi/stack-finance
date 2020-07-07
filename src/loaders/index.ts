import Container from "typedi";
import mongoose from "./mongoose";
import { StockTicker } from "../services/StockTicker";
import EventEmitter from "events";

export default async () => {
  console.log(`Loading...`);

  await mongoose();

  const model = require("../models/StocksSchema").default;
  Container.set("StocksModel", model);

  const eventEmitter = new EventEmitter.EventEmitter();
  Container.set("EventEmitter", eventEmitter);

  const dbObserver = Container.get(StockTicker);
  dbObserver.startTicking();
};
