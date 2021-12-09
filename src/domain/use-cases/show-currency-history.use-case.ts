import currencyService from '../../services/currency-services'

// interface CurrencyApi {
//   USDBRL: {
//     code: String,
//     codein: String,
//     name: String,
//     high: String,
//     low: String,
//     varBid: String,
//     pctChange: String,
//     bid: String,
//     ask: String,
//     timestamp: String,
//     create_date: String,
//   }
// }

// interface CurrencyResponse {
//   [y in String]: {
//     code: String,
//     codein: String,
//     name: String,
//     high: String,
//     low: String,
//     timestamp: String,
//     create_date: String,
//   }
// }

export default class ShowCurrencyUseCase {
  //Resolver tipagem da Promisse (currencyService)
  async execute(): Promise<any> {
    const currency: any = await currencyService.getCurrencyHistory();

    //logica para extratir os dados retornados a api

    return currency;
  }
}