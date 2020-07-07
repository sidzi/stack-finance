"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (ws) => {
    ws.on("message", (message) => {
        console.log(message);
    });
};
//# sourceMappingURL=RequestHandler.js.map