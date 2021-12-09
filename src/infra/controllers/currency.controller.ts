import { Request, Response } from 'express';
import ValidationError from '../../domain/errors/validation.error';
import currencyService from '../../services/currency-services'
import ShowTopTenCurrency from '../../domain/use-cases/show-top-ten-currency.use-case';
import ShowCurrencyHistory from '../../domain/use-cases/show-currency-history.use-case';

export default class CurrencyController {
    constructor(
        private readonly showTopTenCurrency: ShowTopTenCurrency,
        private readonly showCurrencyHistory: ShowCurrencyHistory) {}
    
    async getCurrencyHistory(
        request: Request,
        response: Response
    ): Promise<void> {
        const { body } = request;
        try {
            const currencyHistory = await this.showCurrencyHistory.execute();
            response.status(200).json(currencyHistory);
        } catch (e) {
            let statusCode: number;

            if (e instanceof ValidationError) {
                statusCode = 400;
            } else {
                statusCode = 500;
            }

            response.status(statusCode).json(e);
        }
    }

    async getTopTenCurrency(
        request: Request,
        response: Response
    ): Promise<void> {
        const { body } = request;
        try {
            const topTenCurrency = await this.showTopTenCurrency.execute();
            response.status(200).json(topTenCurrency);
        } catch (e) {
            let statusCode: number;

            if (e instanceof ValidationError) {
                statusCode = 400;
            } else {
                statusCode = 500;
            }

            response.status(statusCode).json(e);
        }
    }
}
