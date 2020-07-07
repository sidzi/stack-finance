import Container from "typedi";
import { Mongoose } from "mongoose";
import mongoose from "./mongoose";
import StocksSchema from "../models/StocksSchema";
import requestHandler from "../services/requestHandler";
import config from "../config";
import MongoOplog from "mongo-oplog";
import { DBObserverService } from "../services/DBObserverService";

export default async () => {
  console.log(`Loading...`);

  await mongoose();
  Container.set("stocks", StocksSchema);

  console.log(`Loaded...`);

  const dbObserver = new DBObserverService(StocksSchema);
  dbObserver.startObserving();
};
