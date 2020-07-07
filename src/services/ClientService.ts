import { Service } from "typedi";
import WebSocket from "ws";

@Service("ClientService")
export class ClientService {
  constructor(private usersMap: Map<string, WebSocket>) {}

  addClient(ws: WebSocket) {
    console.log(`Adding Client`);
    this.usersMap.set("1", ws);
  }

  broadcast(message: string) {
    this.usersMap.get("1").send(message);
  }
}
