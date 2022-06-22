import { FlatList } from "react-native";
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
    <FlatList
      data={coinsList}
      onEndReached={() => {
        fetchCoinData(coinsList.length / 50 + 1);
      }}
      renderItem={({ item }) => <CoinItem coinData={item} />}
      refreshControl={<RefreshControl refreshing={loading} tintColor="white" />}
    />
  );
};

export default HomeScreen;
