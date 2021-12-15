"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("./infra/data/connection"));
const setup_app_1 = __importDefault(require("./setup-app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const conn = (0, connection_1.default)();
(0, setup_app_1.default)(conn);
