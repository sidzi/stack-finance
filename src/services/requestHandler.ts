import WebSocket from "ws";
import Container from "typedi";
import { ClientService } from "./ClientService";
import { RequestOptions } from "https";

export default function (ws: WebSocket, req: RequestOptions) {
  const clientService = Container.get(ClientService);
  clientService.addClient(ws);
}
