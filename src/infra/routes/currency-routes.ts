import { Router } from "express";
import ShowTopTenCurrency from "../../domain/use-cases/show-top-ten-currency.use-case";
import ShowCurrencyUseCase from "../../domain/use-cases/show-currency-history.use-case";
import CurrencyController from "../controllers/currency.controller";


const currencyRoutes = (router: Router) => {
  const CURRENCY_API_PREFIX = '/currencies';

  const showCurrency = new ShowCurrencyUseCase();
  const showTopTenCurrency = new ShowTopTenCurrency();
  const currencyController = new CurrencyController(showCurrency, showTopTenCurrency);

  router.get(CURRENCY_API_PREFIX, (request, response) =>
    currencyController.getCurrencyHistory(request, response)
  );

  router.get(`${CURRENCY_API_PREFIX}/dashboard/history`, (request, response) =>
    currencyController.getTopTenCurrency(request, response)
  );
  
};

export default currencyRoutes;
