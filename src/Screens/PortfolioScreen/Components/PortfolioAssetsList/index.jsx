import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import PortfolioAssetItem from "../PortfolioAssetsItem";
import { useNavigation } from "@react-navigation/native";
// import { useRecoilValue, useRecoilState } from "recoil";
// import {
//   allPortfolioAssets,
//   allPortfolioAssetsBought,
// } from "../../../../atoms/PortfolioAssets";

const PortfolioAssetsList = () => {
  const navigation = useNavigation();

  //  const assets = useRecoilValue(allPortfolioAssets);

  //console.log("all assets bought are ", assets);
  const price_change_percentage_24h = 1.0;
  //console.log("assets list loaded");
  return (
    <View>
      <FlatList
        data={[1, 2, 3]}
        renderItem={({ item }) => <PortfolioAssetItem assetItem={item} />}
        ListHeaderComponent={
          <>
            <View style={styles.balanceContainer}>
              <View>
                <Text style={styles.currentBalance}>Current Balance</Text>
                <Text style={styles.currentBalanceValue}>$8000</Text>
                <Text style={styles.valueChanged}>1000 (All times)</Text>
              </View>
              <View style={styles.priceChangeContainer}>
                <AntDesign
                  name={
                    price_change_percentage_24h < 0 ? "caretdown" : "caretup"
                  }
                  size={10}
                  color="white"
                  style={{ alignSelf: "center", marginRight: 5 }}
                />
                <Text style={styles.percentChanged}>1.2%</Text>
              </View>
            </View>
            <Text style={styles.assetsLabel}>Your assets</Text>
          </>
        }
        ListFooterComponent={
          <Pressable
            style={styles.buttonContainer}
            onPress={() => navigation.navigate("AddNewAssetScreen")}
          >
            <Text style={styles.buttonText}>Add new assets</Text>
          </Pressable>
        }
      />
    </View>
  );
};

export default PortfolioAssetsList;
