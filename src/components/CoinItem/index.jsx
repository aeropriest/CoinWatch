import { Text, View, Image, Pressable } from "react-native";
import React, { useContext } from "react";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";
import themeContext from "./../../config/themeContext";

const CoinItem = ({ coinData }) => {
  const theme = useContext(themeContext);

  const { colors } = useTheme();
  const navigation = useNavigation();

  const {
    id,
    market_cap_rank,
    name,
    symbol,
    current_price,
    price_change_percentage_24h,
    market_cap,
    image,
  } = coinData;

  const priceChangeColor =
    price_change_percentage_24h > 0 ? theme.green : theme.red || "white";

  const normalizeMarketCap = (market_cap) => {
    if (market_cap > 1e12) {
      return `$({market_cap / 1e12).toFixed(3)}T`;
    }
    if (market_cap > 1e9) {
      return `${(market_cap / 1e9).toFixed(3)}B`;
    }
    if (market_cap > 1e6) {
      return `${(market_cap / 1e6).toFixed(3)}M`;
    }
    if (market_cap > 1e3) {
      return `${(market_cap / 1e3).toFixed(3)}K`;
    }
    return market_cap;
  };
  return (
    <Pressable
      style={styles.coinContainer}
      onPress={() => navigation.navigate("CoinDetailedScreen", { coinId: id })}
    >
      <Image
        style={{
          height: 30,
          aspectRatio: 1,
          marginRight: 10,
          alignSelf: "center",
        }}
        source={{
          uri: image,
        }}
      />
      <View>
        <Text style={{ ...styles.title, color: theme.color }}>{name}</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.rankContainer}>
            <Text style={styles.rank}>{market_cap_rank}</Text>
          </View>
          <Text style={{ ...styles.text, color: theme.color }}>
            {symbol.toUpperCase()}
          </Text>
          <AntDesign
            name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
            size={10}
            color={priceChangeColor}
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text style={[styles.text, { color: priceChangeColor }]}>
            {price_change_percentage_24h?.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View style={{ marginLeft: "auto", alignItems: "flex-end" }}>
        <Text style={{ ...styles.title, color: theme.color }}>
          ${current_price.toLocaleString("en-US", { currency: "USD" })}
        </Text>
        <Text style={{ ...styles.text, color: theme.lighter }}>
          MCap {normalizeMarketCap(market_cap)}
        </Text>
      </View>
    </Pressable>
  );
};

export default CoinItem;
