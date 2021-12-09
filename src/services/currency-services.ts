import axios from "axios";


const getTopTenCurrency = async () => {
  const baseURI = process.env.BASE_URI_AWSOMEAPI;
  const favoriteCurrency = "USD-BRL,CAD-BRL,ETH-BRL,EUR-BRL,CHF-BRL,GBP-BRL,CLP-BRL,CNY-BRL,BTC-BRL,AED-BRL";
  const finalURL = `${baseURI}last/${favoriteCurrency}`

  const response = await axios.get(finalURL)

  return response.data
}

const getCurrencyHistory = async () => {
  const baseURI = process.env.BASE_URI_AWSOMEAPI;
  const currency = "USD";
  const finalURL = `${baseURI}${currency}/100`

  const response = await axios.get(finalURL)
 
  return response.data
}

export default {
  getCurrencyHistory,
  getTopTenCurrency
}