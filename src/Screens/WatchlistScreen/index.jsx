import { View, Text, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useWatchList } from "../../Context/WatchListContext";
import CoinItem from "../../components/CoinItem";
import { getWatchListData } from "../../services/CryptoServices";
import { RefreshControl } from "react-native";

import themeContext from "../../config/themeContext";

const WatchlistScreen = () => {
  const theme = useContext(themeContext);
  const { watchListCoinsId } = useWatchList();

  const [coinsData, setCoinsData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const transformCoinsIds = () => watchListCoinsId.join("%2C");

  const fetchWatchListCoinsData = async () => {
    if (loadingData) return;
    setLoadingData(true);
    const watchListedCoinsData = await getWatchListData(1, transformCoinsIds());
    setCoinsData(watchListedCoinsData);
    setLoadingData(false);
  };

  useEffect(() => {
    console.log(watchListCoinsId.length);
    if (watchListCoinsId.length > 0) fetchWatchListCoinsData();
  }, [watchListCoinsId]);

  return (
    <View style={{ backgroundColor: theme.background }}>
      <FlatList
        background={theme.background}
        data={coinsData}
        renderItem={({ item }) => <CoinItem coinData={item} />}
        refreshControl={
          <RefreshControl
            refreshing={loadingData}
            tintColor={theme.color}
            onRefresh={
              watchListCoinsId.length > 0 ? fetchWatchListCoinsData : null
            }
          />
        }
      />
    </View>
  );
};

export default WatchlistScreen;
