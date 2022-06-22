import { View, Text, TextInput, Pressable } from "react-native";
import React, { useEffect, useState, Suspense } from "react";
import SearchableDropDown from "react-native-searchable-dropdown";
import styles from "./styles";
import { useRecoilState } from "recoil";
import { allPortfolioAssetsSaved } from "../../atoms/PortfolioAssets";
import { getAllCoins, getCoinInfo } from "../../services/CryptoServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const hasBoughtAssets = () => boughtAssetQty !== "";

const AddNewAssetScreen = () => {
  const [loading, setLoading] = useState(false);
  const [allCoins, setAllCoins] = useState([]);
  const [boughtAssetQty, setBoughtAssetQty] = useState("");

  const [selectedCoin, setSelectedCoin] = useState(null);
  const [selectedCoinId, setSelectedCoinId] = useState(null);
  const [assetsSaved, setAssetsSaved] = useRecoilState(allPortfolioAssetsSaved);

  const navigation = useNavigation();

  const fetchAllCoins = async () => {
    if (loading) return;
    setLoading(true);
    const allCoinsData = await getAllCoins();
    setAllCoins(allCoinsData);
    setLoading(false);
  };

  const fetchCoinInfo = async (selectedCoinId) => {
    if (loading || !selectedCoinId) return;
    setLoading(true);
    const coinInfo = await getCoinInfo(selectedCoinId);
    setSelectedCoin(coinInfo);
    setLoading(false);
    console.log("--------selectedCoin---------", selectedCoin);
  };
  useEffect(() => {
    fetchAllCoins();
  }, []);

  useEffect(() => {
    console.log("-----selected coin is ", selectedCoinId);
    if (selectedCoinId) {
      fetchCoinInfo(selectedCoinId);
    }
  }, [selectedCoinId]);

  const onAddNewAsset = async () => {
    const newAsset = {
      id: selectedCoin?.id,
      name: selectedCoin?.name,
      image: selectedCoin?.image.small,
      ticker: selectedCoin?.symbol.toUpperCase(),
      qtyBought: parseFloat(boughtAssetQty),
      currentPrice: selectedCoin?.currentPrice,
      percentChange: selectedCoin?.price_change_percentage_24h,
      priceBought: selectedCoin?.priceBought,
    };
    const newAssets = [...assetsSaved, newAsset];
    const jsonValue = JSON.stringify(newAssets);
    console.log("-----new assets-----", jsonValue);
    await AsyncStorage.setItem("@portfolio_coins", jsonValue);
    setAssetsSaved(newAsset);
    navigation.goBack();
  };

  const coinSelected = (item) => {
    console.log("-------coinSelected------", item, item.id);
    console.log("-----before---", selectedCoinId);
    setSelectedCoinId(item?.id);
    console.log("-----after---", selectedCoinId);
  };

  return (
    <View style={{ flex: 1 }}>
      <Suspense
        fallback={<Text style={{ color: "white" }}>Loading please wait</Text>}
      >
        <SearchableDropDown
          items={allCoins}
          onItemSelect={(item) => coinSelected(item)}
          containerStyle={styles.dropDownContainer}
          itemStyle={styles.item}
          itemTextStyle={{
            color: "white",
          }}
          resetValue={false}
          placeholder={selectedCoinId || "Select a coin..."}
          placeholderTextColor="white"
          textInputProps={{
            underlineColorAndroid: "transparent",
            style: {
              padding: 12,
              borderWidth: 1.5,
              borderColor: "#444444",
              borderRadius: 5,
              backgroundColor: "#1e1e1e",
              color: "white",
            },
          }}
        />
      </Suspense>

      {selectedCoin && (
        <>
          <View style={styles.boughtQtyContainer}>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={{ color: "white", fontSize: 90 }}
                value={boughtAssetQty}
                placeholder="0"
                keyboardType="numeric"
                onChangeText={setBoughtAssetQty}
              />
              <Text style={styles.ticker}>
                {selectedCoin?.symbol.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.pricePerCoin}>
              ${selectedCoin?.market_data.current_price.usd} per coin
            </Text>
          </View>
          <Pressable
            style={{
              ...styles.buttonContainer,
              backgroundColor: boughtAssetQty === "" ? "#303030" : "#4169e1",
            }}
            onPress={onAddNewAsset}
            disabled={boughtAssetQty === ""}
          >
            <Text
              style={{
                ...styles.buttonText,
                color: boughtAssetQty === "" ? "grey" : "white",
              }}
            >
              Add new assets
            </Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

export default AddNewAssetScreen;
