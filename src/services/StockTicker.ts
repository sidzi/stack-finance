import {Inject, Service} from "typedi";
import {Document, Model} from "mongoose";
import config from "../config";
import events from "../events/events";
import {IStockSchema} from "../models/IStockSchema";
import EventEmitter from "events";

@Service()
export class StockTicker {
  constructor(
    @Inject("StocksModel") private stocksSchema: Model<Document & IStockSchema>,
    @Inject("EventEmitter")
    private stockTickerEventEmitter: EventEmitter.EventEmitter
  ) {}

  async startTicking() {
    setInterval(async () => {
      const stock = await this.stocksSchema.findOne();
      this.stockTickerEventEmitter.emit(events.stocks.tick, stock);
    }, config.tick_interval);
  }
}
