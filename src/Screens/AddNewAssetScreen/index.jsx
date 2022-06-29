import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";
import styles from "./styles";
import { useRecoilState } from "recoil";
import { allSavedPortfolioAssets } from "../../atoms/PortfolioAssets";
import { getAllCoins, getCoinInfo } from "../../services/CryptoServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import uuid from "react-native-uuid";
import themeContext from "../../config/themeContext";

const AddNewAssetScreen = () => {
  const theme = useContext(themeContext);

  const [allCoins, setAllCoins] = useState([]);
  const [boughtAssetQuantity, setBoughtAssetQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCoinId, setSelectedCoinId] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);

  const [assetsInStorage, setAssetsInStorage] = useRecoilState(
    allSavedPortfolioAssets
  );

  const navigation = useNavigation();

  const isQuantityEntered = () => boughtAssetQuantity === "";

  const fetchAllCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const allCoins = await getAllCoins();
    setAllCoins(allCoins);
    setLoading(false);
  };

  const fetchCoinInfo = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinInfo = await getCoinInfo(selectedCoinId);
    setSelectedCoin(coinInfo);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllCoins();
  }, []);

  useEffect(() => {
    if (selectedCoinId) {
      fetchCoinInfo();
    }
  }, [selectedCoinId]);

  const onAddNewAsset = async () => {
    const newAsset = {
      id: selectedCoin.id,
      uniqueId: selectedCoin.id + uuid.v4(),
      name: selectedCoin.name,
      image: selectedCoin.image.small,
      ticker: selectedCoin.symbol.toUpperCase(),
      quantityBought: parseFloat(boughtAssetQuantity),
      priceBought: selectedCoin.market_data.current_price.usd,
    };
    const newAssets = [...assetsInStorage, newAsset];
    const jsonValue = JSON.stringify(newAssets);
    await AsyncStorage.setItem("@portfolio_coins", jsonValue);
    setAssetsInStorage(newAssets);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={120}
        behavior={Platform.os === "ios" ? "padding" : "height"}
      >
        <SearchableDropdown
          items={allCoins}
          onItemSelect={(item) => setSelectedCoinId(item.id)}
          containerStyle={styles.dropdownContainer}
          itemStyle={{
            ...styles.item,
            backgroundColor: theme.background,
            borderColor: theme.lighter,
            color: theme.color,
          }}
          itemTextStyle={{ color: theme.color }}
          resetValue={false}
          placeholder={selectedCoinId || "Select a coin..."}
          placeholderTextColor={theme.color}
          textInputProps={{
            underlineColorAndroid: "transparent",
            style: {
              padding: 12,
              borderWidth: 1.5,
              borderColor: theme.lighter,
              borderRadius: 5,
              backgroundColor: theme.background,
              color: theme.color,
            },
          }}
        />
        {selectedCoin && (
          <>
            <View
              style={{
                ...styles.boughtQuantityContainer,
                backgroundColor: theme.background,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  style={{ color: theme.color, fontSize: 90 }}
                  value={boughtAssetQuantity}
                  placeholder="0"
                  keyboardType="numeric"
                  onChangeText={setBoughtAssetQuantity}
                />
                <Text style={{ ...styles.ticker, color: theme.color }}>
                  {selectedCoin.symbol.toUpperCase()}
                </Text>
              </View>
              <Text style={{ ...styles.pricePerCoin, color: theme.lighter }}>
                ${selectedCoin.market_data.current_price.usd} per coin
              </Text>
            </View>
            <Pressable
              style={{
                ...styles.buttonContainer,
                backgroundColor: isQuantityEntered()
                  ? theme.disabled
                  : theme.buttonColor,
              }}
              onPress={onAddNewAsset}
              disabled={isQuantityEntered()}
            >
              <Text
                style={{
                  ...styles.buttonText,
                  color: theme.buttonText,
                }}
              >
                Add {boughtAssetQuantity} {selectedCoin.symbol.toUpperCase()}
              </Text>
            </Pressable>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddNewAssetScreen;
