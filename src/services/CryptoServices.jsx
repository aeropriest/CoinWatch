import axios from "axios";

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

export const getCoinMarketData = async (coinId) => {
  try {
    const API_BASE_URL = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=USD&days=1&interval=hourly`;
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const getCoinData = async (coinId) => {
  try {
    const API_BASE_URL = `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`;
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

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
