"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    port: Number(process.env.PORT) || 8080,
    mongo: {
        uri: process.env.MONGODB_URI,
    },
};
//# sourceMappingURL=config.js.map