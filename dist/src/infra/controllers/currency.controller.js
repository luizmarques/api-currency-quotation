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
const validation_error_1 = __importDefault(require("../../domain/errors/validation.error"));
class CurrencyController {
    constructor(showTopTenCurrency, showCurrencyHistory) {
        this.showTopTenCurrency = showTopTenCurrency;
        this.showCurrencyHistory = showCurrencyHistory;
    }
    getCurrencyHistory(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = request;
            const { code } = request.params;
            try {
                const currencyHistory = yield this.showCurrencyHistory.execute(code);
                response.status(200).json(currencyHistory);
            }
            catch (e) {
                let statusCode;
                if (e instanceof validation_error_1.default) {
                    statusCode = 400;
                }
                else {
                    statusCode = 500;
                }
                response.status(statusCode).json(e);
            }
        });
    }
    getTopTenCurrency(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = request;
            try {
                const topTenCurrency = yield this.showTopTenCurrency.execute();
                response.status(200).json(topTenCurrency);
            }
            catch (e) {
                let statusCode;
                if (e instanceof validation_error_1.default) {
                    statusCode = 400;
                }
                else {
                    statusCode = 500;
                }
                response.status(statusCode).json(e);
            }
        });
    }
}
exports.default = CurrencyController;
