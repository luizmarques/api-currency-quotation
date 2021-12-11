import currencyService from '../../services/currency-services'

interface CurrencyApi {
  [key : string]: {
    code: String,
    codein: String,
    name: String,
    high: String,
    low: String,
    varBid: String,
    pctChange: String,
    bid: String,
    ask: String,
    timestamp: String,
    create_date: String,
  }
}

interface CurrencyResponse {
  [key : string]: {
    code: String,
    codein: String,
    name: String,
    high: String,
    low: String,
    timestamp: String,
    create_date: String,
  }
}

export default class ShowCurrencyUseCase {
  async execute(code: string): Promise<CurrencyResponse> {
    const currency: CurrencyApi = await currencyService.getCurrencyHistory(code);

    return currency;
  }
}