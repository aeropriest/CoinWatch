import { View, Text, Image } from "react-native";
import React from "react";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";

const PortfolioAssetItem = ({ assetItem }) => {
  const totalHolding = () => {
    return (qtyBought * priceBought).toFixed(2);
  };
  const priceChangeColor =
    priceChangePercentage > 0 ? "#34C759" : "#FF3B30" || "white";

  const {
    id,
    name,
    image,
    ticker,
    qtyBought,
    priceBought,
    priceChangePercentage,
  } = assetItem;
  return (
    <View style={styles.coinContainer}>
      <Image
        source={{
          uri: image,
        }}
        style={{ height: 30, width: 30, marginRight: 10, alignSelf: "center" }}
      />
      <View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.symbol}>{ticker}</Text>
      </View>
      <View style={{ marginLeft: "auto" }}>
        <Text style={styles.title}>
          $
          {priceBought.toLocaleString("en-US", {
            currency: "USD",
          })}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <AntDesign
            name={priceChangePercentage > 0 ? "caretup" : "caretdown"}
            size={10}
            color={priceChangePercentage > 0 ? "#34C759" : "#FF3B30" || "white"}
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text
            style={{
              color:
                priceChangePercentage > 0 ? "#34C759" : "#FF3B30" || "white",
              fontWeight: "600",
            }}
          >
            {priceChangePercentage.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View style={styles.qtyContainer}>
        <Text style={styles.title}>
          $
          {totalHolding().toLocaleString("en-US", {
            currency: "USD",
          })}
        </Text>
        <Text style={styles.symbol}>
          {qtyBought} {ticker}
        </Text>
      </View>
    </View>
  );
};

export default PortfolioAssetItem;
