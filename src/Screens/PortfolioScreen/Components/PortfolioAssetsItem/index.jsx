import { View, Text, Image } from "react-native";
import React, { useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import themeContext from "../../../../config/themeContext";
import styles from "./styles";

const PortfolioAssetItem = ({ assetItem }) => {
  const theme = useContext(themeContext);

  const totalHolding = () => {
    return (quantityBought * priceBought).toFixed(2);
  };
  const priceChangeColor =
    priceChangePercentage > 0 ? theme.green : theme.red || "white";

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
        flexDirection: "row",
        backgroundColor: theme.background,
        padding: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "grey",
        borderTopColor: "grey",
        borderTopWidth: StyleSheet.hairlineWidth,
      }}
    >
      <Image
        source={{
          uri: image,
        }}
        style={{ height: 30, width: 30, marginRight: 10, alignSelf: "center" }}
      />
      <View>
        <Text style={{ ...styles.title, color: theme.color }}>{name}</Text>
        <Text style={{ ...styles.symbol, color: theme.lighter }}>{ticker}</Text>
      </View>
      <View style={{ marginLeft: "auto" }}>
        <Text style={{ ...styles.title, color: theme.color }}>
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
              priceChangePercentage > 0 ? theme.green : theme.red || "white"
            }
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text
            style={{
              color:
                priceChangePercentage > 0 ? theme.green : theme.red || "white",
              fontWeight: "600",
            }}
          >
            {priceChangePercentage?.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View style={styles.qtyContainer}>
        <Text style={{ ...styles.title, color: theme.color }}>
          $
          {totalHolding().toLocaleString("en-US", {
            currency: "USD",
          })}
        </Text>
        <Text style={{ ...styles.symbol, color: theme.color }}>
          {quantityBought} {ticker}
        </Text>
      </View>
    </View>
  );
};

export default PortfolioAssetItem;
