"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = __importDefault(require("typedi"));
const ClientService_1 = require("./ClientService");
function default_1(ws, req) {
    const clientService = typedi_1.default.get(ClientService_1.ClientService);
    clientService.addClient(ws);
}
exports.default = default_1;
//# sourceMappingURL=requestHandler.js.map