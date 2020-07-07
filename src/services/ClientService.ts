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

  addClient(ws: WebSocket, sessionID?: string) {
    let userID: string;
    if (sessionID) {
      userID = sessionID;
    } else {
      userID = Math.random().toString(12);
      ws.send({ action: "set-cookie", data: sessionID });
    }
    console.log(`Adding Client with ID ${userID}`);
    this.usersMap.set(userID, ws);
  }

  private broadcast(message: any) {
    this.usersMap.forEach((value) => value.send(message.toString()));
  }
}
