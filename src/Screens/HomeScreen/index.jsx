import { FlatList, View, Text } from "react-native";
import React from "react";
import CoinItem from "../../components/CoinItem";
import { RefreshControl } from "react-native";
import { useEffect, useState } from "react";
import { getCryptoCurrencies } from "../../services/CryptoServices";
import styles from "./styles";
import { useTheme } from "@react-navigation/native";

const HomeScreen = () => {
  const { colors } = useTheme();
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
        <Text style={{ ...styles.header, color: colors.text }}>
          Crypto Assets
        </Text>
        <Text
          style={{
            ...styles.subheader,
            color: colors.lightText,
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
