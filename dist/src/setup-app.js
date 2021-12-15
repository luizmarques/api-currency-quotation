"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./infra/routes"));
const cors_1 = __importDefault(require("cors"));
const port = process.env.PORT || 3003;
const setupApp = (connection) => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use((0, routes_1.default)(connection));
    app.listen(port, function () {
        console.log("Express server listening on port: ", port);
    });
};
exports.default = setupApp;
