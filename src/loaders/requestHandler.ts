import WebSocket from "ws";
import Container from "typedi";
import { ClientService } from "../services/ClientService";
import { RequestOptions } from "https";

export default function (ws: WebSocket, req: RequestOptions) {
  ws.on("message", (data:string) => {
    const dataJSON = JSON.parse(data);
    switch (dataJSON["action"]) {
      case "hello":
        const cookie = dataJSON["id"];
        const clientService = Container.get(ClientService);
        clientService.addClient(ws, cookie);
        break;
    }
  });
}
