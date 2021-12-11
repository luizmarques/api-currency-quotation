import currencyService from '../../services/currency-services'

// interface Currency {
//   code?: string;
//   codein?: string;
//   name?: string;
//   high: string;
//   low: string;
//   varBid: string;
//   pctChange: string;
//   bid: string;
//   ask: string;
//   timestamp: string;
//   create_date: string;
// }

export default class ShowCurrencyUseCase {
  //Resolver tipagem da Promisse (currencyService)
  async execute(): Promise<any> {
    const currency: any = await currencyService.getTopTenCurrency();

    //logica para extratir os dados retornados a api

    return currency;
  }
}