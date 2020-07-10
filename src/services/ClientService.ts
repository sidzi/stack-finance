import { Inject, Service } from "typedi";
import WebSocket from "ws";
import EventEmitter from "events";
import events from "../events/events";
import { IStockSchema } from "../models/IStockSchema";
import { STOCKS_LIST } from "../loaders/mockStocks";

@Service()
export class ClientService {
  private usersMap: Map<string, WebSocket> = new Map<string, WebSocket>();

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

  addClient(ws: WebSocket, cookie?: string) {
    let sessionID: string;
    if (cookie && cookie != "undefined") {
      sessionID = this.getCookie("SessionID", cookie);
    }

    if (!sessionID) {
      const randomStockSymbols = STOCKS_LIST.slice(
        0,
        Math.floor(Math.random() * 10) + 2
      );
      const base64edSessionID = Buffer.from(
        randomStockSymbols.join(":"),
        "utf-8"
      ).toString("base64");

      ws.send(
        JSON.stringify({
          action: "set-cookie",
          data: `SessionID=${base64edSessionID}; SameSite=Strict;`,
        })
      );
      sessionID = base64edSessionID;
    }

    this.usersMap.set(sessionID, ws);
  }

  private broadcast(stocks: IStockSchema) {
    this.usersMap.forEach((value, key) => {
      const data = Buffer.from(key, "base64").toString("utf-8");
      const stockSymbols = data.split(":");

      const stocksWithValue = stockSymbols.map((value1) =>
        (stocks.stocks as Map<string, object>).get(value1)
      );

      const message = {
        action: "data",
        data: stocksWithValue,
      };
      value.send(JSON.stringify(message));
    });
  }

  private getCookie(name: string, cookie: string): string {
    const nameLenPlus = name.length + 1;
    return (
      cookie
        .split(";")
        .map((c) => c.trim())
        .filter((cookie) => {
          return cookie.substring(0, nameLenPlus) === `${name}=`;
        })
        .map((cookie) => {
          return decodeURIComponent(cookie.substring(nameLenPlus));
        })[0] || null
    );
  }
}
