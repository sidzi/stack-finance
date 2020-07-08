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
    if (sessionID && sessionID != "undefined") {
      userID = sessionID;
    } else {
      userID = Math.random().toString(36).substring(7);
      ws.send(JSON.stringify({ action: "set-cookie", data: sessionID }));
    }

    if (!this.userStocks.has(userID)) {
      // Just to generate randomization between stock lists
      this.userStocks.set(
        userID,
        STOCKS_LIST.splice(0, Math.max(2, Math.floor(Math.random() * 10)))
      );
    }

    console.log(`Adding Client with ID ${userID}`);
    this.usersMap.set(userID, ws);
  }

  private broadcast(stocks: IStockSchema) {
    this.usersMap.forEach((value, key) => {
      const data = this.userStocks
        .get(key)
        .map((value1) => (stocks.stocks as Map<string, object>).get(value1));

      const message = {
        action: "data",
        data: data,
      };
      value.send(JSON.stringify(message));
    });
  }
}
