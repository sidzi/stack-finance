import mongoose from "mongoose";
import { Db } from "mongodb";
import config from "../config";

export default async (): Promise<Db> => {
  const connection = await mongoose.connect(config.mongo.uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });
  return connection.connection.db;
};
