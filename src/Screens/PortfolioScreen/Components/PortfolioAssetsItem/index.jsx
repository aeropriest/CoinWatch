import { View, Text, Image } from "react-native";
import React from "react";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";

const PortfolioAssetItem = () => {
  return (
    <View style={styles.coinContainer}>
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/1490/1490849.png",
        }}
        style={{ height: 30, width: 30 }}
      />
      <View>
        <Text style={styles.title}>Bitcoin</Text>
        <Text style={styles.symbol}>BTC</Text>
      </View>
      <View style={{ marginLeft: "auto" }}>
        <Text style={styles.title}>$4000</Text>
        <View style={{ flexDirection: "row" }}>
          <AntDesign
            name="caretup"
            size={10}
            color="red"
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text style={{ color: "red", fontWeight: "600" }}>1.2%</Text>
        </View>
      </View>
      <View style={styles.qtyContainer}>
        <Text style={styles.title}>$8000</Text>
        <Text style={styles.symbol}>2 BTC</Text>
      </View>
    </View>
  );
};

export default PortfolioAssetItem;
