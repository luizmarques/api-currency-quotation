import currencyService from '../../services/currency-services'

export default class ShowCurrencyUseCase {
  //Resolver tipagem da Promisse (currencyService)
  async execute(): Promise<any> {
    const currency: any = await currencyService.getTopTenCurrency();

    //logica para extratir os dados retornados a api

    return currency;
  }
}