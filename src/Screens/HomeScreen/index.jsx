import { FlatList } from "react-native";
import React from "react";
import styles from './styles'
import CoinItem from '../../components/CoinItem'
import CryptoCurrenciesDunp from '../../../assets/data/cryptocurrencies.json'
import { useEffect, useState } from 'react';
import {getCryptoCurrencies} from '../../services/CryptoServices'

const HomeScreen = () => {
    const [coinsList, setCoinsList] = useState([]);

    const fetchCoinData = async () => {
      const cryptoCurrencies = await getCryptoCurrencies();
      console.log('-------fetchCoinData-----------')
      console.log(cryptoCurrencies);
      setCoinsList(cryptoCurrencies);
    }
    useEffect(()=>{
      fetchCoinData();
      }, [])
    
    return(
        <FlatList 
          data={coinsList}
          renderItem={({item}) => <CoinItem 
          coinData={item}
        />}
      />
    )
}

export default HomeScreen;