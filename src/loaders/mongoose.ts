import mongoose from "mongoose";
import { Db } from "mongodb";
import config from "../config";

export default async (): Promise<Db> => {
  const connection = await mongoose.connect("mongodb+srv://client:grO3FXYbPM6QB35M@stack-finance.sgvm0.mongodb.net/main?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  return connection.connection.db;
};
