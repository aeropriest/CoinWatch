 import axios from "axios"

export const getCoinMarketData = async (coinId) => {
    try{
        const API_BASE_URL = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=USD&days=1&interval=hourly`
        console.log(API_BASE_URL);
        const response = await axios.get(API_BASE_URL);
        return response.data
    }catch(err){
        console.log(err.message)
    }
}

export const getCoinData = async (coinId) => {
    try{        
        const API_BASE_URL = `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false` 
        console.log(API_BASE_URL);
        const response = await axios.get(API_BASE_URL);
        return response.data
    }catch(err){
        console.log(err.message)
    }
}