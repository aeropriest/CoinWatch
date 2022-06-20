import { View, Text, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useWatchList } from "../../Context/WatchListContext";
import CoinItem from "../../components/CoinItem";
import { getWatchListData } from "../../services/CryptoServices";
import { RefreshControl } from "react-native";

const WatchlistScreen = () => {
  const { watchListCoinsId, saveWatchListCoinId, removeWatchListCoinId } =
    useWatchList();

  const [coinsData, setCoinsData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const transformCoinsIds = () => watchListCoinsId.join("%2C");

  const fetchWatchListCoinsData = async () => {
    console.log(" what is in watchListCoinsId ", watchListCoinsId.length);
    if (loadingData || !watchListCoinsId.length) return;
    setLoadingData(true);
    const watchListedCoinsData = await getWatchListData(1, transformCoinsIds());
    setCoinsData(watchListedCoinsData);
    setLoadingData(false);
  };

  useEffect(() => {
    fetchWatchListCoinsData();
  }, []);

  // useEffect(() => {}, [watchListCoinsId]);

  return (
    <FlatList
      data={coinsData}
      renderItem={({ item }) => <CoinItem coinData={item} />}
      refreshControl={
        <RefreshControl
          refreshing={loadingData}
          tintColor="white"
          onRefresh={fetchWatchListCoinsData}
        />
      }
    />
  );
};

export default WatchlistScreen;
