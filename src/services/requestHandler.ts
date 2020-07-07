import WebSocket from "ws";
import Container from "typedi";
import { ClientService } from "./ClientService";
import { RequestOptions } from "https";

export default function (ws: WebSocket, req: RequestOptions) {
  console.log(`${req.toString()}`)
  const clientService = Container.get(ClientService);
  clientService.addClient(ws);
}
