"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = __importDefault(require("typedi"));
const mongoose_1 = __importDefault(require("./mongoose"));
const StocksSchema_1 = __importDefault(require("../models/StocksSchema"));
const DBObserverService_1 = require("../services/DBObserverService");
exports.default = async () => {
    console.log(`Loading...`);
    await mongoose_1.default();
    typedi_1.default.set("stocks", StocksSchema_1.default);
    console.log(`Loaded...`);
    const dbObserver = new DBObserverService_1.DBObserverService(StocksSchema_1.default);
    dbObserver.startObserving();
};
//# sourceMappingURL=index.js.map