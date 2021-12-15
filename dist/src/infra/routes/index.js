"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./user-routes"));
const currency_routes_1 = __importDefault(require("./currency-routes"));
const routes = (connection) => {
    const router = express_1.default.Router();
    (0, user_routes_1.default)(router, connection);
    (0, currency_routes_1.default)(router);
    return router;
};
exports.default = routes;
