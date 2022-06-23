import axios from "axios";

//get all the currencies by rank and its associated data
export const getCryptoCurrencies = async (pageNumber = 1) => {
  try {
    //const API_BASE_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=7d`
    const API_BASE_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false&price_change_percentage=24h`;

    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// get the hourly coin data for coin id
export const getCoinMarketData = async (coinId, range = 1) => {
  console.log(getCoinMarketData);
  try {
    const API_BASE_URL = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=USD&days=${range}&interval=hourly`;
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

//get the history data for a coin id
export const getCoinData = async (coinId) => {
  try {
    const API_BASE_URL = `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`;
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

//get all the data for selected coin id seperated by %C20
export const getWatchListData = async (pageNumber = 1, coinsId) => {
  try {
    const API_BASE_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinsId}&order=market_cap_desc&per_page=100&page=${pageNumber}&sparkline=false`;
    //console.log("----getWatchListData--------- ", API_BASE_URL);
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

//gets all the coins
export const getAllCoins = async () => {
  try {
    const API_BASE_URL = `https://api.coingecko.com/api/v3/coins/list?include_=false`;
    //console.log("----getWatchListData--------- ", API_BASE_URL);
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// get the coin id associated information
export const getCoinInfo = async (coinId) => {
  try {
    //const API_BASE_URL = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`;
    const API_BASE_URL = `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`;
    console.log(API_BASE_URL);
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// get the coin id associated candle stick data
export const getCoinCandleData = async (coinId, days = 1) => {
  try {
    const API_BASE_URL = `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=${days}`;
    //console.log(API_BASE_URL);
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};
