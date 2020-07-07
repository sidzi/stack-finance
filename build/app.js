"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const config_1 = __importDefault(require("./config"));
const requestHandler_1 = __importDefault(require("./services/requestHandler"));
async function startServer() {
    await require("./loaders").default();
    const wss = new ws_1.default.Server({
        host: "0.0.0.0",
        port: config_1.default.port,
    }, () => {
        console.log(`Listening on ${config_1.default.port}`);
    });
    wss.on("connection", requestHandler_1.default);
}
startServer();
//# sourceMappingURL=app.js.map