import mongoose, { Document, model } from "mongoose";
import { IStockSchema } from "./IStockSchema";

const StocksSchema = new mongoose.Schema({
  _id: String,
  stocks: Map,
});

export default model<IStockSchema & Document>(
  "StocksSchema",
  StocksSchema,
  "stocks"
);
