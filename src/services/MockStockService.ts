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
    setInterval(async () => {
      STOCKS_LIST.forEach(
        (value) =>
          (mockStockMap[value] = {
            text: value,
            value: Math.random().toFixed(2),
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
    }, 2500);
  }
}
