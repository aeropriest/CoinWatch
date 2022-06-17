import { Text, View, Image } from "react-native";
import React from 'react'
import styles from './styles'
import { AntDesign } from "@expo/vector-icons";

const CoinItem = ({coinData}) => {
    const{
        market_cap_rank, name, symbol, current_price, price_change_percentage_24h, market_cap, image
    }=coinData;

    const priceChangeColor = price_change_percentage_24h > 0 ? '#34C759' : '#FF3B30';

    const normalizeMarketCap = (market_cap) => {
        console.log(market_cap);
        console.log(symbol)
        if( market_cap > 1_000_000_000_000){
            return `${Math.floor(market_cap / 1_000_000_000_000)}T`
        } if( market_cap > 1_000_000_000){
            return `${Math.floor(market_cap / 1_000_000_000)}B`
        }if( market_cap > 1_000_000){
            return `${Math.floor(market_cap / 1_000_000)}M`
        }if( market_cap > 1_000_000){
            return `${Math.floor(market_cap / 1_000_000)}K`
        }
        return market_cap;
    }
  return (
    <View style={styles.coinContainer}>
    <Image
    
      style={{ height: 30, aspectRatio: 1, marginRight: 10, alignSelf: 'center' }}
      source={{
        uri: image,
    }}
    />
    <View>
      <Text style={styles.title}>{name}</Text>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.rankContainer}>
        <Text style={styles.rank}>{market_cap_rank}</Text>
        </View>
        <Text style={styles.text}>{symbol.toUpperCase()}</Text>
        <AntDesign
          name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
          size={10}
          color={priceChangeColor}
          style={{ alignSelf: "center", marginRight: 5 }}
        />
        <Text style={[styles.text, {color:priceChangeColor}]}>{price_change_percentage_24h.toFixed(2)}%</Text>
      </View>
    </View>
    <View style={{ marginLeft: "auto", alignItems: 'flex-end'}}>
      <Text style={styles.title}>${current_price.toLocaleString('en-US', {currency: 'USD'})}</Text>
      <Text style={styles.text}>MCap {normalizeMarketCap(market_cap)}</Text>
    </View>
  </View>
    )
}

export default CoinItem