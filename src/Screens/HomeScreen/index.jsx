import { FlatList } from "react-native";
import React from "react";
import styles from './styles'
import CoinItem from '../../components/CoinItem'
import CryptoCurrencies from '../../../assets/data/cryptocurrencies.json'
import { getMarketData } from '../../services/CryptoServices'
import { useEffect, useState } from 'react';

const HomeScreen = () => {
    const [data, setData] = useState([]);
    useEffect(()=>{
        const fetchMarketData = async () => {
          const marketData = await getMarketData();
          console.log(marketData);
          setData(marketData);
        }
    
        fetchMarketData();
      }, [])
    
    return(
        <FlatList 
          data={CryptoCurrencies}
          renderItem={({item}) => <CoinItem 
          coinData={item}
        />}
      />
    )
}

export default HomeScreen;