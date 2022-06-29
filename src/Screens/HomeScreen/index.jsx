import { FlatList, View, Text } from "react-native";
import React from "react";
import CoinItem from "../../components/CoinItem";
import { RefreshControl } from "react-native";
import { useEffect, useState, useContext } from "react";
import { getCryptoCurrencies } from "../../services/CryptoServices";
import styles from "./styles";
import themeContext from "./../../config/themeContext";

const HomeScreen = () => {
  const theme = useContext(themeContext);
  const [coinsList, setCoinsList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoinData = async (pageNumber) => {
    if (loading) return;
    setLoading(true);
    const cryptoCurrencies = await getCryptoCurrencies(pageNumber);
    setCoinsList((existingCoin) => [...existingCoin, ...cryptoCurrencies]);
    setLoading(false);
  };

  const refreshCoins = async () => {
    if (loading) return;
    setLoading(true);
    const cryptoCurrencies = await getCryptoCurrencies();
    setCoinsList(cryptoCurrencies);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoinData();
  }, []);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: 15,
          paddingBottom: 10,
          paddingRight: 15,
          alignContent: "center",
        }}
      >
        <Text style={{ ...styles.header, color: theme.color }}>
          Crypto Assets
        </Text>
        <Text
          style={{
            ...styles.subheader,
            color: theme.lighter,
            paddingTop: 5,
          }}
        >
          Powered by CoinGecko
        </Text>
      </View>
      <FlatList
        data={coinsList}
        onEndReached={() => {
          fetchCoinData(coinsList.length / 50 + 1);
        }}
        renderItem={({ item }) => <CoinItem coinData={item} />}
        refreshControl={
          <RefreshControl refreshing={loading} tintColor="white" />
        }
      />
    </View>
  );
};

export default HomeScreen;
