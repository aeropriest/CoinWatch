import { View, Text, FlatList, Pressable } from "react-native";
import React, { useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import PortfolioAssetItem from "../PortfolioAssetsItem";
import { useNavigation } from "@react-navigation/native";
import { useRecoilValue, useRecoilState } from "recoil";
import { SwipeListView } from "react-native-swipe-list-view";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  allPortfolioAssets,
  allSavedPortfolioAssets,
} from "../../../../atoms/PortfolioAssets";
import themeContext from "./../../../../config/themeContext";

const PortfolioAssetsList = () => {
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const assets = useRecoilValue(allPortfolioAssets);
  const [savedAssets, setSavedAssets] = useRecoilState(allSavedPortfolioAssets);

  const getCurrentBalance = () =>
    assets.reduce(
      (total, currentAsset) =>
        total + currentAsset.currentPrice * currentAsset.quantityBought,
      0
    );
  const getBoughtBalance = () =>
    assets.reduce(
      (total, currentAsset) =>
        total + currentAsset.priceBought * currentAsset.quantityBought,
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

  const onDeleteAsset = async (asset) => {
    const newAssets = savedAssets.filter(
      (coin) => coin.uniqueId !== asset.item.uniqueId
    );
    const jsonValue = JSON.stringify(newAssets);
    await AsyncStorage.setItem("@portfolio_coins", jsonValue);
    setSavedAssets(newAssets);
  };

  const renderDeleteButton = (data) => {
    return (
      <Pressable
        style={{
          flex: 1,
          backgroundColor: theme.red,
          alignItems: "flex-end",
          justifyContent: "center",
          paddingRight: 28,
        }}
        onPress={() => onDeleteAsset(data)}
      >
        <FontAwesome name="trash-o" size={25} color={"white"} />
      </Pressable>
    );
  };
  return (
    <SwipeListView
      data={assets}
      renderItem={({ item }) => <PortfolioAssetItem assetItem={item} />}
      rightOpenValue={-75}
      disableRightSwipe
      keyExtractor={({ id }, index) => `${id}${index}`}
      renderHiddenItem={(data, rowMap) => renderDeleteButton(data)}
      leftActionValue={200}
      ListHeaderComponent={
        <>
          <View style={{ ...styles.balanceContainer, color: theme.background }}>
            <View>
              <Text style={{ ...styles.currentBalance, color: theme.color }}>
                Current Balance
              </Text>
              <Text
                style={{ ...styles.currentBalanceValue, color: theme.color }}
              >
                $
                {getCurrentBalance().toLocaleString("en-US", {
                  currency: "USD",
                })}
              </Text>
              <Text
                style={{
                  ...styles.valueChanged,
                  color:
                    getPercetangeChange().toFixed(2) > 0
                      ? theme.green
                      : theme.red || "white",
                }}
              >
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
                  getPercetangeChange() > 0
                    ? theme.green
                    : theme.red || "white",
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
          <Text style={{ ...styles.assetsLabel, color: theme.color }}>
            Your assets
          </Text>
        </>
      }
      ListFooterComponent={
        <>
          <Pressable
            style={{ ...styles.buttonContainer }}
            onPress={() => navigation.navigate("AddNewAssetScreen")}
          >
            <Text style={{ ...styles.buttonText, color: theme.buttonText }}>
              Add New Asset
            </Text>
          </Pressable>
        </>
      }
    />
  );
};

export default PortfolioAssetsList;
