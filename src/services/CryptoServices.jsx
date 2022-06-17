import axios from "axios"
//import moment from "moment"

const fromatSparkline = (numbers) => {
    const sevenDaysAgo = moment().subtract(7, 'days').unix();
    let formattedSparkline = numbers.map((item, index) => {
        return {
            x: sevenDaysAgo + (index+1) * 3600,
            y: item,
        }
    })

    console.log('formattedSparkline is ')

    return formattedSparkline;
}

const formatMarketData = (data) => {
    let formattedData = [];

    data.forEach( item => {
        const formattedSparkline = fromatSparkline(item.sparkline_in_7d.price)

        const formattedItem = {
            ...item,
            sparkline_in_7d:{
                price: formattedSparkline
            }
        }
        formattedData.push(formattedItem)
    })

    console.log('returning formated data')
    return formattedData;
}

export const getMarketData = async () => {

    try{
        const API_BASE_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=7d`
        const response = await axios.get(API_BASE_URL);
        var data = response.data;
        const formattedResponse = formatMarketData(data);
        return formattedResponse;
    }catch(err){
        console.log(err.message)
    }
}