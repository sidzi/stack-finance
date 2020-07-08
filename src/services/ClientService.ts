import { Inject, Service } from "typedi";
import WebSocket from "ws";
import EventEmitter from "events";
import events from "../events/events";
import { IStockSchema } from "../models/IStockSchema";
import { STOCKS_LIST } from "../loaders/mockStocks";

@Service()
export class ClientService {
  private usersMap: Map<string, WebSocket> = new Map<string, WebSocket>();
  private userStocks: Map<string, Array<string>> = new Map<
    string,
    Array<string>
  >();

  constructor(
    @Inject("EventEmitter")
    private stockTickerEventEmitter: EventEmitter.EventEmitter
  ) {
    stockTickerEventEmitter.addListener(
      events.stocks.tick,
      (args: IStockSchema) => {
        this.broadcast(args);
      }
    );
  }

  addClient(ws: WebSocket, sessionID?: string) {
    let userID: string;
    if (sessionID) {
      userID = sessionID;
    } else {
      userID = Math.random().toString(12);
      ws.send({ action: "set-cookie", data: sessionID });
    }

    if (!this.userStocks.has(userID)) {
      this.userStocks.set(userID, STOCKS_LIST);
    }

    console.log(`Adding Client with ID ${userID}`);
    this.usersMap.set(userID, ws);
  }

  private broadcast(stocks: IStockSchema) {
    this.usersMap.forEach((value, key) => {
      console.log(JSON.stringify(stocks));
      const data = this.userStocks
        .get(key)
        .map((value1) => stocks.stocks[value1]);
      const message = {
        action: "data",
        data: data,
      };
      value.send(JSON.stringify(message));
    });
  }
}
