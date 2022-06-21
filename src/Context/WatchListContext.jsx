import React, { useContext, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WatchListContext = createContext();

export const useWatchList = () => useContext(WatchListContext);

const WatchListProvider = ({ children }) => {
  const [watchListCoinsId, setWatchListCoinsId] = useState([]);

  const saveWatchListCoinId = async (coinId) => {
    try {
      const newWatchList = [...watchListCoinsId, coinId];
      const jsonValue = JSON.stringify(newWatchList);
      await AsyncStorage.setItem("@watchlist_coins", jsonValue);
      setWatchListCoinsId(newWatchList);
    } catch (e) {
      console.log(e);
    }
  };
  const getWatchListData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@watchlist_coins");
      setWatchListCoinsId(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      console.log(e);
    }
  };

  const removeWatchListCoinId = async (coinId) => {
    try {
      const newWatchList = watchListCoinsId.filter(
        (coinIdValue) => coinIdValue !== coinId
      );

      const jsonValue = JSON.stringify(newWatchList);
      await AsyncStorage.setItem("@watchlist_coins", jsonValue);
      setWatchListCoinsId(newWatchList);
    } catch (e) {}
  };

  useEffect(() => {
    getWatchListData();
  }, []);

  return (
    <WatchListContext.Provider
      value={{ watchListCoinsId, saveWatchListCoinId, removeWatchListCoinId }}
    >
      {children}
    </WatchListContext.Provider>
  );
};

export default WatchListProvider;
