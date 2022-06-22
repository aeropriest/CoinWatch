import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import PortfolioAssetItem from "../PortfolioAssetsItem";
import { useNavigation } from "@react-navigation/native";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  allPortfolioAssets,
  allPortfolioAssetsBought,
} from "../../../../atoms/PortfolioAssets";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PortfolioAssetsList = () => {
  const navigation = useNavigation();
  const assets = useRecoilValue(allPortfolioAssets);

  const getCurrentBalance = () =>
    assets.reduce(
      (total, currentAsset) =>
        total + currentAsset.currentPrice * currentAsset.qtyBought,
      0
    );
  const getBoughtBalance = () =>
    assets.reduce(
      (total, currentAsset) =>
        total + currentAsset.priceBought * currentAsset.qtyBought,
      0
    );

  const getCurrentChange = () => {
    return getCurrentBalance() - getBoughtBalance();
  };

  const getPercetangeChange = () => {
    return (
      ((getCurrentBalance() - getBoughtBalance()) / getBoughtBalance()) * 100 ||
      0
    );
  };
  return (
    <FlatList
      data={assets}
      renderItem={({ item }) => <PortfolioAssetItem assetItem={item} />}
      ListHeaderComponent={
        <>
          <View style={styles.balanceContainer}>
            <View>
              <Text style={styles.currentBalance}>Current Balance</Text>
              <Text style={styles.currentBalanceValue}>
                $
                {getCurrentBalance().toLocaleString("en-US", {
                  currency: "USD",
                })}
              </Text>
              <Text
                style={{
                  ...styles.valueChanged,
                  color:
                    getPercetangeChange() > 0
                      ? "#34C759"
                      : "#FF3B30" || "white",
                }}
              >
                $
                {getCurrentChange().toLocaleString("en-US", {
                  currency: "USD",
                })}{" "}
                (All times)
              </Text>
            </View>
            <View
              style={{
                ...styles.priceChangeContainer,
                backgroundColor:
                  getPercetangeChange() > 0 ? "#34C759" : "#FF3B30" || "white",
              }}
            >
              <AntDesign
                name={getPercetangeChange() < 0 ? "caretdown" : "caretup"}
                size={10}
                color="white"
                style={{ alignSelf: "center", marginRight: 5 }}
              />
              <Text style={styles.percentChanged}>
                {getPercetangeChange().toFixed(2)}
              </Text>
            </View>
          </View>
          <Text style={styles.assetsLabel}>Your assets</Text>
        </>
      }
      ListFooterComponent={
        <>
          <Pressable
            style={styles.buttonContainer}
            onPress={() => navigation.navigate("AddNewAssetScreen")}
          >
            <Text style={styles.buttonText}>Add new assets</Text>
          </Pressable>
          <Pressable
            style={styles.buttonContainer}
            onPress={() => {
              console.log("clear the storeage");
              AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);
            }}
          >
            <Text style={styles.buttonText}>Clear Assets</Text>
          </Pressable>
        </>
      }
    />
  );
};

export default PortfolioAssetsList;
