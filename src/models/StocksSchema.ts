import mongoose, { Document, model } from "mongoose";
import { IStockSchema } from "./IStockSchema";

const StocksSchema = new mongoose.Schema({
  stocks: Array,
});

export default model<IStockSchema & Document>(
  "StocksSchema",
  StocksSchema,
  "stocks"
);
