import { ClientService } from "../src/services/ClientService";
import * as EventEmitter from "events";
import WebSocket from "ws";
import events from "../src/events/events";

describe("Client Service Tests", function () {
  it("should send stocks depending on user via websocket", function () {
    const eventEmitter = new EventEmitter.EventEmitter();
    const webSocket = new WebSocket("ws://localhost:8080", {});
    webSocket.send = jest.fn().mockImplementation();

    const clientService = new ClientService(eventEmitter);

    clientService.addClient(webSocket, "mock-session-id");

    eventEmitter.emit(events.stocks.tick, {
      _id: "5f06125bf495ff0713cda64a",
      stocks: {
        GOG: { text: "GOG", value: 0.5646949928484346 },
        BLU: { text: "BLU", value: 0.8875987878296265 },
        CUI: { text: "CUI", value: 0.35280215503700085 },
        NSD: { text: "NSD", value: 0.5324194351747551 },
        POP: { text: "POP", value: 0.9358558957826635 },
        WOH: { text: "WOH", value: 0.8821242501731801 },
        UID: { text: "UID", value: 0.9586788372260273 },
        IAU: { text: "IAU", value: 0.7787706032131805 },
        UYA: { text: "UYA", value: 0.8360507496706922 },
        POA: { text: "POA", value: 0.5856470582426456 },
      },
    });

    expect(webSocket.send).toBeCalled();
  });
});
