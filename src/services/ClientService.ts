import { Inject, Service } from "typedi";
import WebSocket from "ws";
import EventEmitter from "events";
import events from "../events/events";

@Service()
export class ClientService {
  private usersMap: Map<string, WebSocket> = new Map<string, WebSocket>();

  constructor(
    @Inject("EventEmitter")
    private stockTickerEventEmitter: EventEmitter.EventEmitter
  ) {
    stockTickerEventEmitter.addListener(events.stocks.tick, (args) => {
      this.broadcast(args);
    });
  }

  addClient(ws: WebSocket) {
    console.log(`Adding Client`);
    this.usersMap.set("1", ws);
  }

  private broadcast(message: any) {
    this.usersMap.get("1").send(message.toString());
  }
}
