import { Inject, Service } from "typedi";
import { Document, Model } from "mongoose";
import { IStockSchema } from "../models/IStockSchema";
import { STOCKS_LIST } from "../loaders/mockStocks";

@Service()
export class MockStockService {
  constructor(
    @Inject("StocksModel") private stockSchema: Model<IStockSchema & Document>
  ) {}

  public async populateDBWithRandomValues() {
    const mockStockMap: object = {};
    STOCKS_LIST.forEach(
      (value) =>
        (mockStockMap[value] = {
          text: value,
          value: Math.random(),
        })
    );
    await this.stockSchema.updateOne(
      {},
      {
        $set: {
          stocks: mockStockMap,
        },
      },
      {
        upsert: true,
      }
    );
  }
}
