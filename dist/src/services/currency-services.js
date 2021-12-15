"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const getTopTenCurrency = () => __awaiter(void 0, void 0, void 0, function* () {
    const baseURI = process.env.BASE_URI_AWSOMEAPI;
    const favoriteCurrency = "USD-BRL,CAD-BRL,ETH-BRL,EUR-BRL,CHF-BRL,GBP-BRL,CLP-BRL,CNY-BRL,BTC-BRL,AED-BRL";
    const finalURL = `${baseURI}last/${favoriteCurrency}`;
    const response = yield axios_1.default.get(finalURL);
    return response.data;
});
const getCurrencyHistory = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const baseURI = process.env.BASE_URI_AWSOMEAPI;
    const currency = code;
    const finalURL = `${baseURI}daily/${currency}/30`;
    const response = yield axios_1.default.get(finalURL);
    return response.data;
});
exports.default = {
    getCurrencyHistory,
    getTopTenCurrency
};
