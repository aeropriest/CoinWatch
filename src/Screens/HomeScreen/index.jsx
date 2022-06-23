import { FlatList, View, Text } from "react-native";
import React from "react";
import CoinItem from "../../components/CoinItem";
import { RefreshControl } from "react-native";
import { useEffect, useState } from "react";
import { getCryptoCurrencies } from "../../services/CryptoServices";

const HomeScreen = () => {
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
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            fontFamily: "DroidSans",
            color: "white",
            fontSize: 24,
            letterSpacing: 1,
            paddingHorizontal: 20,
            paddingBottom: 5,
            paddingTop: 15,
          }}
        >
          Crypto Assets
        </Text>
        <Text
          style={{
            fontFamily: "DroidSans",
            color: "lightgrey",
            fontSize: 10,
            letterSpacing: 0,
            paddingHorizontal: 20,
            paddingBottom: 5,
            paddingTop: 15,
            alignSelf: "center",
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
