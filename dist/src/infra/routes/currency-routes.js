"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const show_top_ten_currency_use_case_1 = __importDefault(require("../../domain/use-cases/show-top-ten-currency.use-case"));
const show_currency_history_use_case_1 = __importDefault(require("../../domain/use-cases/show-currency-history.use-case"));
const currency_controller_1 = __importDefault(require("../controllers/currency.controller"));
const currencyRoutes = (router) => {
    const CURRENCY_API_PREFIX = '/currencies';
    const showCurrency = new show_currency_history_use_case_1.default();
    const showTopTenCurrency = new show_top_ten_currency_use_case_1.default();
    const currencyController = new currency_controller_1.default(showTopTenCurrency, showCurrency);
    router.get(CURRENCY_API_PREFIX, (request, response) => currencyController.getTopTenCurrency(request, response));
    router.get(`${CURRENCY_API_PREFIX}/dashboard/history/:code`, (request, response) => currencyController.getCurrencyHistory(request, response));
};
exports.default = currencyRoutes;
