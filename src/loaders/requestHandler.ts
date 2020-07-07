import WebSocket from "ws";
import Container from "typedi";
import { ClientService } from "../services/ClientService";
import { RequestOptions } from "https";

export default function (ws: WebSocket, req: RequestOptions) {
  const sessionID = req.headers.cookie.toString();
  const clientService = Container.get(ClientService);
  clientService.addClient(ws, sessionID);
}
