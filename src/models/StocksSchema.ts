import mongoose, { Document, model } from "mongoose";

const StocksSchema = new mongoose.Schema({
  stocks: Array,
});

export interface IStockSchema {
  stocks: IStock[];
}

interface IStock {
  text: string;
  value: string;
}

export default model<IStockSchema & Document>("StocksSchema", StocksSchema);
