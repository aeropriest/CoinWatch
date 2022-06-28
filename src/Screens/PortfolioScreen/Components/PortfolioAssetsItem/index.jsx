import { View, Text, Image } from "react-native";
import React from "react";
//import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const PortfolioAssetItem = ({ assetItem }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    coinContainer: {
      flexDirection: "row",
      padding: 15,
      backgroundColor: "#ffffff",
    },
    title: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
      alignSelf: "flex-end",
    },
    symbol: {
      color: "grey",
      fontWeight: "600",
    },
    qtyContainer: {
      marginLeft: "auto",
      alignItems: "flex-end",
    },
  });

  const totalHolding = () => {
    return (quantityBought * priceBought).toFixed(2);
  };
  const priceChangeColor =
    priceChangePercentage > 0 ? colors.green : colors.red || "white";

  const {
    id,
    name,
    image,
    ticker,
    quantityBought,
    priceBought,
    priceChangePercentage,
    currentPrice,
  } = assetItem;
  return (
    <View
      style={{
        ...styles.coinContainer,
      }}
    >
      <Image
        source={{
          uri: image,
        }}
        style={{ height: 30, width: 30, marginRight: 10, alignSelf: "center" }}
      />
      <View>
        <Text style={{ ...styles.title, color: colors.text }}>{name}</Text>
        <Text style={{ ...styles.symbol, color: colors.lightText }}>
          {ticker}
        </Text>
      </View>
      <View style={{ marginLeft: "auto" }}>
        <Text style={{ ...styles.title, color: colors.text }}>
          $
          {priceBought?.toLocaleString("en-US", {
            currency: "USD",
          })}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <AntDesign
            name={priceChangePercentage > 0 ? "caretup" : "caretdown"}
            size={10}
            color={
              priceChangePercentage > 0 ? colors.green : colors.red || "white"
            }
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text
            style={{
              color:
                priceChangePercentage > 0
                  ? colors.green
                  : colors.red || "white",
              fontWeight: "600",
            }}
          >
            {priceChangePercentage?.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View style={styles.qtyContainer}>
        <Text style={{ ...styles.title, color: colors.text }}>
          $
          {totalHolding().toLocaleString("en-US", {
            currency: "USD",
          })}
        </Text>
        <Text style={{ ...styles.symbol, color: colors.text }}>
          {quantityBought} {ticker}
        </Text>
      </View>
    </View>
  );
};

export default PortfolioAssetItem;
